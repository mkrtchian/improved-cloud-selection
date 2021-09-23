import { useState } from "react";
import Head from "next/head";
import CloudProviders from "../components/CloudProviders";
import styles from "../styles/Home.module.css";
import RegionsList from "../components/RegionsList";
import { useOrganizedClouds, useLocationByIP } from "../hooks";
import { CloudsObject, GeoPosition } from "../constants/types";
import CloudsList from "../components/CloudList";
import { API_PATHS } from "../constants/paths";

type HomeProps = {
  cloudsObject: CloudsObject;
};

/**
 * Main page displaying the improved cloud selection.
 */
function Home({ cloudsObject }: HomeProps): JSX.Element {
  const [selectedProvider, setSelectedProvider] = useState(
    "Google Cloud Platform"
  );
  const [selectedRegion, setSelectedRegion] = useState("Europe");
  const [locationByIP, setLocationByIP] = useState<GeoPosition>();
  useLocationByIP(setLocationByIP);
  const organizedClouds = useOrganizedClouds(cloudsObject, locationByIP);

  const selectedProviderExists = selectedProvider in organizedClouds;
  const selectedRegionExists =
    selectedProviderExists &&
    selectedRegion in organizedClouds[selectedProvider];
  return (
    <div className={styles.container}>
      <Head>
        <title>Improved cloud selection</title>
      </Head>

      <main role="main">
        <h1 className="title">Enhanced cloud selection</h1>
        <CloudProviders setSelectedProvider={setSelectedProvider} />
        {selectedProviderExists && (
          <>
            <RegionsList
              organizedRegions={organizedClouds[selectedProvider]}
              setSelectedRegion={setSelectedRegion}
            />
            {selectedRegionExists && (
              <CloudsList
                cloudsList={organizedClouds[selectedProvider][selectedRegion]}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

type HomeStaticProps = {
  props: { cloudsObject: CloudsObject };
};

export async function getStaticProps(): Promise<HomeStaticProps> {
  const res = await fetch(API_PATHS.clouds);
  const cloudsObject: CloudsObject = await res.json();
  return {
    props: {
      cloudsObject,
    },
  };
}

export default Home;

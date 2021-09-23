import { useState } from "react";
import Head from "next/head";
import CloudProviders from "../components/CloudProviders";
import styles from "../styles/Home.module.css";
import RegionsList from "../components/RegionsList";
import { useOrganizedClouds, useLocationByIP } from "../hooks";
import { CloudsObject, GeoPosition } from "../constants/types";
import CloudsContainer from "../components/clouds/CloudsContainer";
import { API_PATHS } from "../constants/paths";
import NavigatorLocationButton from "../components/NavigatorLocationButton";

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
  const [userLocation, setUserLocation] = useState<GeoPosition>();
  useLocationByIP(setUserLocation);
  const organizedClouds = useOrganizedClouds(cloudsObject, userLocation);

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
        <NavigatorLocationButton setUserLocation={setUserLocation} />
        <CloudProviders
          setSelectedProvider={setSelectedProvider}
          selectedProvider={selectedProvider}
        />
        {selectedProviderExists && (
          <>
            <RegionsList
              organizedRegions={organizedClouds[selectedProvider]}
              setSelectedRegion={setSelectedRegion}
              selectedRegion={selectedRegion}
              userLocation={userLocation}
            />
            {selectedRegionExists && (
              <CloudsContainer
                cloudList={organizedClouds[selectedProvider][selectedRegion]}
                userLocation={userLocation}
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

import { useState, useMemo } from "react";
import Head from "next/head";
import CloudProviders from "../components/CloudProviders";
import styles from "../styles/Home.module.css";
import RegionsList from "../components/RegionsList";
import { useClouds } from "../hooks";
import { Clouds, CloudsObject } from "../constants/types";
import CloudsList from "../components/CloudList";
import { API_PATHS } from "../constants/paths";

type OrganizedClouds = {
  [key: string]: {
    [key: string]: Clouds;
  };
};

type HomeProps = {
  cloudsObject: CloudsObject;
};

/**
 * Main page displaying the improved cloud selection.
 */
function Home({ cloudsObject }: HomeProps): JSX.Element {
  const [selectedProvider, setSelectedProvider] = useState(
    "Amazon Web Services"
  );
  const [selectedRegion, setSelectedRegion] = useState("");
  const { clouds } = useClouds(cloudsObject);

  const organizedClouds = useMemo(
    function generateOrganizedClouds() {
      const tempClouds: OrganizedClouds = {};
      for (const cloud of clouds) {
        if (!(cloud.cloud_provider in tempClouds)) {
          tempClouds[cloud.cloud_provider] = {};
        }
        if (!(cloud.cloud_region in tempClouds[cloud.cloud_provider])) {
          tempClouds[cloud.cloud_provider][cloud.cloud_region] = [];
        }
        tempClouds[cloud.cloud_provider][cloud.cloud_region].push(cloud);
      }
      return tempClouds;
    },
    [clouds]
  );

  const selectedProviderExists = selectedProvider in organizedClouds;
  const regionsList = useMemo(
    function generateRegionsList() {
      return selectedProviderExists
        ? Object.keys(organizedClouds[selectedProvider])
        : [];
    },
    [organizedClouds, selectedProvider]
  );

  const selectedRegionExists =
    selectedProviderExists &&
    selectedRegion in organizedClouds[selectedProvider];
  const cloudsList = useMemo(
    function generateCloudsList() {
      return selectedRegionExists
        ? organizedClouds[selectedProvider][selectedRegion]
        : [];
    },
    [organizedClouds, selectedProvider, selectedRegion]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Improved cloud selection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main role="main">
        <h1 className="title">Enhanced cloud selection</h1>
        <CloudProviders setSelectedProvider={setSelectedProvider} />
        <RegionsList
          regionsList={regionsList}
          setSelectedRegion={setSelectedRegion}
        />
        <CloudsList cloudsList={cloudsList} />
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

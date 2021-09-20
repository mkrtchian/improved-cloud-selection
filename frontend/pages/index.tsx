import { useState } from "react";
import Head from "next/head";
import CloudProviders from "../components/CloudProviders";
import styles from "../styles/Home.module.css";
import RegionsList from "../components/RegionsList";

/**
 * Main page displaying the improved cloud selection.
 */
function Home(): JSX.Element {
  const [selectedProvider, setSelectedProvider] = useState(
    "Amazon Web Services"
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
        <RegionsList selectedProvider={selectedProvider} />
      </main>
    </div>
  );
}

export default Home;

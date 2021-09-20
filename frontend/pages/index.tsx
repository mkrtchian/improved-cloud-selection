import Head from "next/head";
import CloudProviders from "../components/CloudProviders";
import styles from "../styles/Home.module.css";
import { useClouds } from "../hooks";

/**
 * Main page displaying the improved cloud selection.
 */
function Home(): JSX.Element {
  const { clouds } = useClouds();
  return (
    <div className={styles.container}>
      <Head>
        <title>Improved cloud selection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main role="main">
        <h1 className="title">Hello world!</h1>
        <CloudProviders />
        {clouds.map((cloud) => cloud.cloud_region)}
      </main>
    </div>
  );
}

export default Home;

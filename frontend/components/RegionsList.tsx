import { useClouds } from "../hooks";
import styles from "./RegionsList.module.css";

type RegionsListProps = {
  selectedProvider: string;
};

/**
 * List the possible places according to the cloud provider selected.
 */
function RegionsList({ selectedProvider }: RegionsListProps): JSX.Element {
  const { clouds } = useClouds();

  const regionsList = [];
  for (const cloud of clouds) {
    if (cloud.cloud_provider === selectedProvider) {
      if (!regionsList.includes(cloud.cloud_region)) {
        regionsList.push(cloud.cloud_region);
      }
    }
  }

  return (
    <ul className={styles.list}>
      {regionsList.map((region) => {
        return <li key={region}>{region}</li>;
      })}
    </ul>
  );
}

export default RegionsList;

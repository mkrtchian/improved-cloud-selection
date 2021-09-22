import { useEffect } from "react";
import styles from "./RegionsList.module.css";

type RegionsListProps = {
  regionsList: string[];
  setSelectedRegion: (selectedProvider: string) => void;
};

/**
 * List the possible places according to the cloud provider selected.
 */
function RegionsList({
  regionsList,
  setSelectedRegion,
}: RegionsListProps): JSX.Element {
  const sortedRegionsList = regionsList.slice().sort();
  useEffect(
    function setInitialSelectedRegion() {
      if (regionsList && regionsList.length > 0) {
        setSelectedRegion(regionsList[0]);
      }
    },
    [regionsList]
  );
  function handleClickRegion(regionName: string) {
    setSelectedRegion(regionName);
  }
  return (
    <ul className={styles.list}>
      {sortedRegionsList.map((region) => {
        return (
          <li key={region}>
            <button onClick={() => handleClickRegion(region)}>{region}</button>
          </li>
        );
      })}
    </ul>
  );
}

export default RegionsList;

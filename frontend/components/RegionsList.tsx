import { useMemo, useEffect } from "react";
import styles from "./RegionsList.module.css";
import { Clouds } from "../constants/types";

type RegionsListProps = {
  organizedRegions: { [key: string]: Clouds };
  setSelectedRegion: (selectedProvider: string) => void;
};

/**
 * List the possible places according to the cloud provider selected.
 */
function RegionsList({
  organizedRegions,
  setSelectedRegion,
}: RegionsListProps): JSX.Element {
  const sortedRegionsList = useMemo(
    function generateRegionsList() {
      const regionsList = Object.keys(organizedRegions);
      return regionsList.slice().sort();
    },
    [organizedRegions]
  );
  useEffect(
    function setInitialSelectedRegion() {
      if (sortedRegionsList && sortedRegionsList.length > 0) {
        setSelectedRegion(sortedRegionsList[0]);
      }
    },
    [sortedRegionsList]
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

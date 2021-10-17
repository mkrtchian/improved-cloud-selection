import { useMemo } from "react";
import styles from "./RegionsList.module.scss";
import { Clouds, GeoPosition } from "../constants/types";
import { useSetInitialRegion } from "../hooks";

type RegionsListProps = {
  organizedRegions: { [regionName: string]: Clouds };
  selectedRegion: string;
  setSelectedRegion: (selectedProvider: string) => void;
  userLocation?: GeoPosition;
};

/**
 * List the possible places according to the cloud provider selected.
 */
function RegionsList({
  organizedRegions,
  selectedRegion,
  setSelectedRegion,
  userLocation,
}: RegionsListProps): JSX.Element {
  const sortedRegionsList = useMemo(
    function generateRegionsList() {
      const regionsList = Object.keys(organizedRegions);
      return regionsList.slice().sort();
    },
    [organizedRegions]
  );
  useSetInitialRegion({
    defaultRegion: sortedRegionsList && sortedRegionsList[0],
    organizedRegions,
    setSelectedRegion,
    userLocation,
  });
  function handleClickRegion(regionName: string): void {
    setSelectedRegion(regionName);
  }
  return (
    <ul className={styles.list}>
      {sortedRegionsList.map((region) => {
        const selected = selectedRegion === region;
        return (
          <li
            key={region}
            aria-current={selected ? "location" : undefined}
            className={`${styles.items} ${selected ? styles.selected : ""}`}
          >
            <button
              className={`${styles.button} ${selected ? styles.selected : ""}`}
              onClick={() => handleClickRegion(region)}
            >
              {region}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default RegionsList;

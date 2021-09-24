import { useMemo, useEffect } from "react";
import styles from "./RegionsList.module.scss";
import { Clouds, GeoPosition } from "../constants/types";
import { getDistance } from "geolib";

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
  useEffect(
    function setInitialSelectedRegion() {
      const atLeastOneRegion = sortedRegionsList.length;
      if (atLeastOneRegion) {
        const nearestRegion = getRegionWithNearestCloud(sortedRegionsList[0]);
        setSelectedRegion(nearestRegion);
      }
      function getRegionWithNearestCloud(fallbackRegion: string): string {
        let currentRegion = fallbackRegion;
        let currentRegionCloud = organizedRegions[currentRegion][0];
        if (userLocation) {
          let userToCurrentRegion = getDistance(
            userLocation,
            currentRegionCloud
          );
          for (const [regionCandidate, regionCandidateClouds] of Object.entries(
            organizedRegions
          )) {
            const userToRegionCandidate = getDistance(
              userLocation,
              regionCandidateClouds[0]
            );
            if (userToRegionCandidate < userToCurrentRegion) {
              currentRegion = regionCandidate;
              currentRegionCloud = regionCandidateClouds[0];
              userToCurrentRegion = getDistance(
                userLocation,
                currentRegionCloud
              );
            }
          }
        }
        return currentRegion;
      }
    },
    [sortedRegionsList]
  );
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

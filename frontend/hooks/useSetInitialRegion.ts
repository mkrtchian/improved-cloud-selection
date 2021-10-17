import { useEffect } from "react";
import { GeoPosition, Clouds } from "../constants/types";
import { getDistance } from "geolib";

type UseSetInitialRegion = {
  /**
   * If the default region is not given, nothing will be done.
   */
  defaultRegion?: string;
  organizedRegions: { [regionName: string]: Clouds };
  setSelectedRegion: (selectedProvider: string) => void;
  userLocation?: GeoPosition;
};

/**
 * Set the initial region to the default region or to the region with the
 * nearest cloud if the user location is known.
 */
function useSetInitialRegion({
  defaultRegion,
  organizedRegions,
  setSelectedRegion,
  userLocation,
}: UseSetInitialRegion): void {
  useEffect(
    function setInitialSelectedRegion() {
      const atLeastOneRegion = Boolean(defaultRegion);
      if (atLeastOneRegion) {
        const nearestRegion = getRegionWithNearestCloud(defaultRegion);
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
    [organizedRegions]
  );
}

export default useSetInitialRegion;

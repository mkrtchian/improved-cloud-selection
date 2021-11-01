import { useEffect } from "react";
import { GeoPosition, OrganizedClouds } from "../constants/types";

type UseSetInitialProvider = {
  /**
   * If the default region is not given, nothing will be done.
   */
  organizedClouds: OrganizedClouds;
  setSelectedProvider: (selectedProvider: string) => void;
  userLocation?: GeoPosition;
};

/**
 * Set the initial cloud provider to the provider with the nearest cloud
 * if the user location is known.
 */
function useSetInitialProvider({
  organizedClouds,
  setSelectedProvider,
  userLocation,
}: UseSetInitialProvider): void {
  useEffect(
    function setInitialSelectedRegion() {
      if (userLocation) {
        setSelectedProvider;
      }
    },
    [organizedClouds]
  );
}

export default useSetInitialProvider;

import { GeoPosition } from "../constants/types";
import { useNavigatorLocation } from "../hooks";
import styles from "./NavigatorLocationButton.module.css";

type NavigatorLocationButtonProps = {
  setUserLocation: (locationValue: GeoPosition) => void;
};

/**
 * Button to trigger and get the user location through the navigator
 * geolocation API.
 */
function NavigatorLocationButton({
  setUserLocation,
}: NavigatorLocationButtonProps): JSX.Element {
  const callNavigatorGeoLocation = useNavigatorLocation(setUserLocation);
  return (
    <>
      <button className={styles.button} onClick={callNavigatorGeoLocation}>
        More precise distance results
      </button>
    </>
  );
}

export default NavigatorLocationButton;

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
    <button className={styles.button} onClick={callNavigatorGeoLocation}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 513.597 513.597"
        className={styles.locateIcon}
      >
        {
          // Icon made by Freepik
          // https://www.flaticon.com/free-icon/tool_44334
        }
        <g>
          <path
            d="M263.278,0.107C158.977-3.408,73.323,80.095,73.323,183.602c0,117.469,112.73,202.72,175.915,325.322
		c3.208,6.225,12.169,6.233,15.388,0.009c57.16-110.317,154.854-184.291,172.959-290.569
		C456.331,108.387,374.776,3.866,263.278,0.107z M256.923,279.773c-53.113,0-96.171-43.059-96.171-96.171
		s43.059-96.171,96.171-96.171c53.113,0,96.172,43.059,96.172,96.171S310.036,279.773,256.923,279.773z"
          />
        </g>
        aria-hidden={true}
      </svg>
      More precise results
    </button>
  );
}

export default NavigatorLocationButton;

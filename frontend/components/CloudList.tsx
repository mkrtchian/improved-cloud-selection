//import styles from "./CloudList.module.css";
import { Clouds } from "../constants/types";

type CloudListProps = {
  cloudsList: Clouds;
};

/**
 * List the possible places according to the cloud provider selected.
 */
function CloudList({ cloudsList }: CloudListProps): JSX.Element {
  const sortedCloudList = cloudsList.slice().sort();
  return (
    <ul>
      {sortedCloudList.map((cloud) => {
        return <li key={cloud.cloud_name}>{cloud.cloud_name}</li>;
      })}
    </ul>
  );
}

export default CloudList;

//import styles from "./CloudList.module.css";
import { Clouds } from "../constants/types";
import Cloud from "./Cloud";
import styles from "./CloudList.module.css";

type CloudListProps = {
  cloudsList: Clouds;
};

/**
 * List the possible places according to the cloud provider selected.
 */
function CloudList({ cloudsList }: CloudListProps): JSX.Element {
  const sortedCloudList = cloudsList.slice().sort();
  return (
    <ul className={styles.cloudlist}>
      {sortedCloudList.map((cloud) => {
        return <Cloud key={cloud.cloud_name} cloud={cloud} />;
      })}
    </ul>
  );
}

export default CloudList;

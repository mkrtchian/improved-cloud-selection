import { useMemo } from "react";
import { Clouds } from "../../constants/types";
import Cloud from "./Cloud";
import styles from "./CloudList.module.css";

type CloudListProps = {
  cloudList: Clouds;
};

/**
 * List the possible places according to the cloud provider selected.
 */
function CloudList({ cloudList }: CloudListProps): JSX.Element {
  const sortedCloudList = useMemo(
    function generateCloudsList() {
      return cloudList.slice().sort();
    },
    [cloudList]
  );
  return (
    <ul className={styles.cloudlist}>
      {sortedCloudList.map((cloud) => {
        return <Cloud key={cloud.cloud_name} cloud={cloud} />;
      })}
    </ul>
  );
}

export default CloudList;

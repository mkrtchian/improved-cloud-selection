import styles from "./CloudProviders.module.css";

type CloudProvidersProps = {
  setSelectedProvider: (selectedProvider: string) => void;
};

/**
 * List the available cloud providers with images.
 */
function CloudProviders({
  setSelectedProvider,
}: CloudProvidersProps): JSX.Element {
  const cloudProviders = [
    { name: "Amazon Web Services", src: "/images/aws_logo.svg" },
    { name: "Google Cloud Platform", src: "/images/gcp_logo.svg" },
    { name: "Microsoft Azure", src: "/images/azure_logo.svg" },
    { name: "DigitalOcean", src: "/images/digital_ocean_logo.svg" },
    { name: "UpCloud", src: "/images/upcloud_logo.svg" },
  ];
  function handleClickProvider(providerName) {
    setSelectedProvider(providerName);
  }
  return (
    <ul className={styles.list}>
      {cloudProviders.map((provider) => {
        return (
          <li key={provider.name}>
            <button
              className={styles.button}
              onClick={() => handleClickProvider(provider.name)}
            >
              <img // eslint-disable-line @next/next/no-img-element
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}${provider.src}`}
                alt={provider.name}
                className={styles.image}
              />
              <span className={styles.name}>{provider.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default CloudProviders;

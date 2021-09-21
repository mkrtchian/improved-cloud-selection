import { API_PATHS } from "../constants/paths";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const axiosResponseClouds = {
  data: {
    clouds: [
      {
        cloud_description:
          "Africa, South Africa - Amazon Web Services: Cape Town",
        cloud_name: "aws-af-south-1",
        geo_latitude: -33.92,
        geo_longitude: 18.42,
        geo_region: "africa",
        cloud_region: "Africa",
        cloud_provider: "Amazon Web Services",
      },
      {
        cloud_description: "Asia, Bahrain - Amazon Web Services: Bahrain",
        cloud_name: "aws-me-south-1",
        geo_latitude: 26.07,
        geo_longitude: 50.55,
        geo_region: "south asia",
        cloud_region: "Asia",
        cloud_provider: "Amazon Web Services",
      },
      {
        cloud_description: "Asia, India - DigitalOcean: Bangalore",
        cloud_name: "do-blr",
        geo_latitude: 12.96,
        geo_longitude: 77.59,
        geo_region: "south asia",
        cloud_region: "Asia",
        cloud_provider: "DigitalOcean",
      },
      {
        cloud_description: "Canada, Ontario - DigitalOcean: Toronto",
        cloud_name: "do-tor",
        geo_latitude: 45.7,
        geo_longitude: -79.4,
        geo_region: "north america",
        cloud_region: "Canada",
        cloud_provider: "DigitalOcean",
      },
      {
        cloud_description: "Asia, Singapore - DigitalOcean: Singapore",
        cloud_name: "do-sgp",
        geo_latitude: 1.3,
        geo_longitude: 103.8,
        geo_region: "southeast asia",
        cloud_region: "Asia",
        cloud_provider: "DigitalOcean",
      },
    ],
  },
} as const;

/**
 * Mocks all the backend API called with axios with realistic data.
 */
export function axiosGlobalMock(): void {
  mockAxiosGet();
}

function mockAxiosGet() {
  mockedAxios.get.mockImplementation((url: string) => {
    if (url === API_PATHS.clouds) {
      return Promise.resolve(axiosResponseClouds);
    } else {
      return Promise.reject(new Error(`The URL '${url}' is not supported.`));
    }
  });
}

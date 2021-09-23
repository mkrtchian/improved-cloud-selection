import { API_PATHS } from "../constants/paths";
import axios from "axios";
import {
  CloudsObject,
  GeoPositionResponse,
  EmptyResponse,
} from "../constants/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

export let axiosResponseClouds: { data: CloudsObject };
let axiosResponseLocationByIp: GeoPositionResponse | EmptyResponse;

export function setAxiosResponseLocationByIp(
  data: GeoPositionResponse | EmptyResponse
): void {
  axiosResponseLocationByIp = data;
}

/**
 * Mocks all the backend API called with axios with realistic data.
 */
export function axiosGlobalMock(): void {
  axiosResponseClouds = {
    data: {
      clouds: [
        {
          cloud_description:
            "Africa, South Africa - Amazon Web Services: Cape Town",
          cloud_name: "aws-af-south-1",
          latitude: -33.92,
          longitude: 18.42,
          cloud_region: "Africa",
          cloud_provider: "Amazon Web Services",
        },
        {
          cloud_description: "Asia, Bahrain - Amazon Web Services: Bahrain",
          cloud_name: "aws-me-south-1",
          latitude: 26.07,
          longitude: 50.55,
          cloud_region: "Asia",
          cloud_provider: "Amazon Web Services",
        },
        {
          cloud_description: "Asia, India - DigitalOcean: Bangalore",
          cloud_name: "do-blr",
          latitude: 12.96,
          longitude: 77.59,
          cloud_region: "Asia",
          cloud_provider: "DigitalOcean",
        },
        {
          cloud_description: "Canada, Ontario - DigitalOcean: Toronto",
          cloud_name: "do-tor",
          latitude: 45.7,
          longitude: -79.4,
          cloud_region: "Canada",
          cloud_provider: "DigitalOcean",
        },
        {
          cloud_description: "Asia, Singapore - DigitalOcean: Singapore",
          cloud_name: "do-sgp",
          latitude: 1.3,
          longitude: 103.8,
          cloud_region: "Asia",
          cloud_provider: "DigitalOcean",
        },
        {
          cloud_description: "Canada, Quebec - Google Cloud: Montr\u00e9al",
          cloud_name: "google-northamerica-northeast1",
          latitude: 45.5,
          longitude: -73.57,
          cloud_region: "Canada",
          cloud_provider: "Google Cloud Platform",
        },
        {
          cloud_description: "Australia, Victoria - Google Cloud: Melbourne",
          cloud_name: "google-australia-southeast2",
          latitude: -37.815,
          longitude: 144.946,
          cloud_region: "Australia",
          cloud_provider: "Google Cloud Platform",
        },
      ],
    },
  };
  axiosResponseLocationByIp = {
    data: {
      longitude: 1.29,
      latitude: 45.33,
      other_prop: "blabla",
    },
  };
  mockAxiosGet();
}

function mockAxiosGet() {
  mockedAxios.get.mockImplementation((url: string) => {
    if (url === API_PATHS.clouds) {
      return Promise.resolve(axiosResponseClouds);
    } else if (url === API_PATHS.locationByIP) {
      return Promise.resolve(axiosResponseLocationByIp);
    } else {
      return Promise.reject(new Error(`The URL '${url}' is not supported.`));
    }
  });
}

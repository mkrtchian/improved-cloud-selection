import axios from "axios";
import useSWR from "swr";
import { API_PATHS } from "../constants/paths";
import { Clouds, CloudsObject } from "../constants/types";

function fetcher(url: string) {
  return axios.get(url).then((res) => res.data);
}

type UseClouds = {
  clouds: Clouds;
  isCloudsLoading: boolean;
  isCloudsError: boolean;
};

function useClouds(fallbackData?: CloudsObject): UseClouds {
  const { data, error } = useSWR<CloudsObject>(API_PATHS.clouds, fetcher, {
    fallbackData: fallbackData,
  });
  const clouds = data ? data.clouds : [];
  return {
    clouds: clouds,
    isCloudsLoading: !error && !data,
    isCloudsError: Boolean(error),
  };
}

export default useClouds;

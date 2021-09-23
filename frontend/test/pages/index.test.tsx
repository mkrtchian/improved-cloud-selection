import React from "react";
import { render } from "../testUtils";
import {
  axiosGlobalMock,
  axiosResponseClouds,
  setAxiosResponseLocationByIp,
} from "../axiosMock";
import Home from "../../pages/index";
import { fireEvent } from "@testing-library/dom";
import { act, RenderResult } from "@testing-library/react";

beforeEach(() => {
  axiosGlobalMock();
});

afterEach(() => {
  jest.clearAllMocks();
});

async function renderHome() {
  let app: RenderResult;
  await act(async () => {
    app = render(<Home cloudsObject={axiosResponseClouds.data} />);
  });
  return app;
}

it(`displays the correct possible regions when a cloud provider is
  selected`, async () => {
  const { getByAltText, getByText, queryByText } = await renderHome();
  expect(getByText("Australia")).toBeInTheDocument();
  expect(queryByText("Asia")).not.toBeInTheDocument();
  expect(getByText("Canada")).toBeInTheDocument();
  expect(queryByText("Africa")).not.toBeInTheDocument();
  const digitalOcean = getByAltText("DigitalOcean");
  fireEvent.click(digitalOcean);
  expect(getByText("Asia")).toBeInTheDocument();
  expect(getByText("Canada")).toBeInTheDocument();
  expect(queryByText("Africa")).not.toBeInTheDocument();
  expect(queryByText("Australia")).not.toBeInTheDocument();
});

describe("With the user location known", () => {
  it(`displays the correct clouds when a cloud provider and a region is
  selected`, async () => {
    setAxiosResponseLocationByIp({
      data: { longitude: 100.05, latitude: 1.36 },
    });
    const { getByAltText, getByRole, getAllByTestId } = await renderHome();
    let clouds = getAllByTestId("cloud-name");
    expect(clouds[0].textContent).toBe("google-australia-southeast2");
    expect(clouds).toHaveLength(1);
    const digitalOcean = getByAltText("DigitalOcean");
    fireEvent.click(digitalOcean);
    const asia = getByRole("button", { name: "Asia" });
    fireEvent.click(asia);
    clouds = getAllByTestId("cloud-name");
    expect(clouds[0].textContent).toBe("do-sgp");
    expect(clouds[1].textContent).toBe("do-blr");
    expect(clouds).toHaveLength(2);
    const canada = getByRole("button", { name: "Canada" });
    fireEvent.click(canada);
    clouds = getAllByTestId("cloud-name");
    expect(clouds[0].textContent).toBe("do-tor");
    expect(clouds).toHaveLength(1);
  });

  it(`selects the region with the nearest cloud when selecting a
  provider`, async () => {
    const { getByAltText, getByRole } = await renderHome();
    let canada = getByRole("button", { name: "Canada" }).closest("li");
    const australia = getByRole("button", { name: "Australia" }).closest("li");
    expect(canada).toHaveAttribute("aria-current", "location");
    expect(australia).not.toHaveAttribute("aria-current");
    fireEvent.click(getByAltText("DigitalOcean"));
    const asia = getByRole("button", { name: "Asia" }).closest("li");
    canada = getByRole("button", { name: "Canada" }).closest("li");
    expect(canada).toHaveAttribute("aria-current", "location");
    expect(asia).not.toHaveAttribute("aria-current", "location");
  });
});

describe("With the user location unknown", () => {
  beforeEach(function setGeoLocationAPIToEmpty() {
    setAxiosResponseLocationByIp({ data: {} });
  });

  it(`displays the correct clouds when a cloud provider and a region is
  selected`, async () => {
    const { getByAltText, getByRole, getAllByTestId } = await renderHome();
    let clouds = getAllByTestId("cloud-name");
    expect(clouds[0].textContent).toBe("google-australia-southeast2");
    expect(clouds).toHaveLength(1);
    const digitalOcean = getByAltText("DigitalOcean");
    fireEvent.click(digitalOcean);
    const asia = getByRole("button", { name: "Asia" });
    fireEvent.click(asia);
    clouds = getAllByTestId("cloud-name");
    expect(clouds[0].textContent).toBe("do-blr");
    expect(clouds[1].textContent).toBe("do-sgp");
    expect(clouds).toHaveLength(2);
    const canada = getByRole("button", { name: "Canada" });
    fireEvent.click(canada);
    clouds = getAllByTestId("cloud-name");
    expect(clouds[0].textContent).toBe("do-tor");
    expect(clouds).toHaveLength(1);
  });

  it(`selects the first region in an alphabetical order when selecting a
  provider`, async () => {
    const { getByAltText, getByRole } = await renderHome();
    let canada = getByRole("button", { name: "Canada" }).closest("li");
    const australia = getByRole("button", { name: "Australia" }).closest("li");
    expect(australia).toHaveAttribute("aria-current", "location");
    expect(canada).not.toHaveAttribute("aria-current");
    fireEvent.click(getByAltText("DigitalOcean"));
    const asia = getByRole("button", { name: "Asia" }).closest("li");
    canada = getByRole("button", { name: "Canada" }).closest("li");
    expect(asia).toHaveAttribute("aria-current", "location");
    expect(canada).not.toHaveAttribute("aria-current", "location");
  });
});

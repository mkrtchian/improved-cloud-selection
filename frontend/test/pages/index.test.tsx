import React from "react";
import { render } from "../testUtils";
import { axiosGlobalMock, axiosResponseClouds } from "../axiosMock";
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

it("displays title", async () => {
  const { getByText } = await renderHome();
  expect(getByText("Enhanced cloud selection")).toBeInTheDocument();
});

describe("Display elements after user selection", () => {
  it(`displays the correct possible regions when a cloud provider is
  selected`, async () => {
    const { getByAltText, getByText, queryByText } = await renderHome();
    const digitalOcean = getByAltText("DigitalOcean");
    fireEvent.click(digitalOcean);
    expect(getByText("Asia")).toBeInTheDocument();
    expect(getByText("Canada")).toBeInTheDocument();
    expect(queryByText("Africa")).not.toBeInTheDocument();
    expect(queryByText("Australia")).not.toBeInTheDocument();
  });

  it(`displays the correct clouds when a cloud provider and a region is
  selected`, async () => {
    const { getByAltText, getByText, queryByText, getByRole } =
      await renderHome();
    const digitalOcean = getByAltText("DigitalOcean");
    fireEvent.click(digitalOcean);
    expect(queryByText("aws-af-south-1")).not.toBeInTheDocument();
    expect(queryByText("aws-me-south-1")).not.toBeInTheDocument();
    expect(getByText("do-blr")).toBeInTheDocument();
    expect(queryByText("do-tor")).not.toBeInTheDocument();
    expect(getByText("do-sgp")).toBeInTheDocument();
    expect(queryByText("google-australia-southeast2")).not.toBeInTheDocument();
    const canada = getByRole("button", { name: "Canada" });
    fireEvent.click(canada);
    expect(queryByText("aws-af-south-1")).not.toBeInTheDocument();
    expect(queryByText("aws-me-south-1")).not.toBeInTheDocument();
    expect(queryByText("do-blr")).not.toBeInTheDocument();
    expect(getByText("do-tor")).toBeInTheDocument();
    expect(queryByText("do-sgp")).not.toBeInTheDocument();
    expect(queryByText("google-australia-southeast2")).not.toBeInTheDocument();
  });
});

describe("Display elements at the beginning", () => {
  it(`displays the correct possible regions when a cloud provider is
  selected`, async () => {
    const { getByText, queryByText } = await renderHome();
    expect(getByText("Australia")).toBeInTheDocument();
    expect(queryByText("Asia")).not.toBeInTheDocument();
    expect(queryByText("Canada")).not.toBeInTheDocument();
    expect(queryByText("Africa")).not.toBeInTheDocument();
  });

  it(`displays the clouds from the correct region when the page is loaded,
  depending on the user ip address location`, async () => {
    const { getByText, queryByText } = await renderHome();
    expect(queryByText("aws-af-south-1")).not.toBeInTheDocument();
    expect(queryByText("aws-me-south-1")).not.toBeInTheDocument();
    expect(queryByText("do-blr")).not.toBeInTheDocument();
    expect(queryByText("do-tor")).not.toBeInTheDocument();
    expect(queryByText("do-sgp")).not.toBeInTheDocument();
    expect(getByText("google-australia-southeast2")).toBeInTheDocument();
  });
});

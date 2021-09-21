import React from "react";
import { render } from "../testUtils";
import { axiosGlobalMock } from "../axiosMock";
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
    app = render(<Home />);
  });
  return app;
}

it("displays title", async () => {
  const { getByText } = await renderHome();
  expect(getByText("Enhanced cloud selection")).toBeInTheDocument();
});

it(`displays the correct possible regions when a cloud provider is
  selected`, async () => {
  const { getByAltText, getByText, queryByText } = await renderHome();
  expect(getByText("Africa")).toBeInTheDocument();
  expect(getByText("Asia")).toBeInTheDocument();
  const digitalOcean = getByAltText("DigitalOcean");
  fireEvent.click(digitalOcean);
  expect(getByText("Asia")).toBeInTheDocument();
  expect(getByText("Canada")).toBeInTheDocument();
  expect(queryByText("Africa")).not.toBeInTheDocument();
});

it(`displays the correct clouds when a cloud provider and a region is
selected`, async () => {
  const { getByAltText, getByText, queryByText, getByRole } =
    await renderHome();
  expect(getByText("aws-af-south-1")).toBeInTheDocument();
  expect(queryByText("aws-me-south-1")).not.toBeInTheDocument();
  expect(queryByText("do-blr")).not.toBeInTheDocument();
  expect(queryByText("do-tor")).not.toBeInTheDocument();
  expect(queryByText("do-sgp")).not.toBeInTheDocument();
  const digitalOcean = getByAltText("DigitalOcean");
  fireEvent.click(digitalOcean);
  expect(queryByText("aws-af-south-1")).not.toBeInTheDocument();
  expect(queryByText("aws-me-south-1")).not.toBeInTheDocument();
  expect(getByText("do-blr")).toBeInTheDocument();
  expect(queryByText("do-tor")).not.toBeInTheDocument();
  expect(getByText("do-sgp")).toBeInTheDocument();
  const canada = getByRole("button", { name: "Canada" });
  fireEvent.click(canada);
  expect(queryByText("aws-af-south-1")).not.toBeInTheDocument();
  expect(queryByText("aws-me-south-1")).not.toBeInTheDocument();
  expect(queryByText("do-blr")).not.toBeInTheDocument();
  expect(getByText("do-tor")).toBeInTheDocument();
  expect(queryByText("do-sgp")).not.toBeInTheDocument();
});

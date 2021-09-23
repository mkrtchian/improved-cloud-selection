import React from "react";
import { render } from "../../testUtils";
import { fireEvent } from "@testing-library/react";
import CloudsContainer from "../../../components/clouds/CloudsContainer";
import { axiosResponseClouds, axiosGlobalMock } from "../../axiosMock";

beforeEach(() => {
  axiosGlobalMock();
});

function renderCloudsContainer(addUserLocation?: boolean) {
  const userLocation = {
    longitude: 1.29,
    latitude: 45.33,
  };
  return render(
    <CloudsContainer
      cloudList={axiosResponseClouds.data.clouds}
      userLocation={addUserLocation ? userLocation : undefined}
    />
  );
}

const addUserLocation = [{ addUserLocation: true }, { addUserLocation: false }];

test.each(addUserLocation)(
  `displays all the provided clouds by default,
  including userLocation begin: $addUserLocation`,
  ({ addUserLocation }) => {
    const { getAllByTestId } = renderCloudsContainer(addUserLocation);
    const clouds = getAllByTestId("cloud-name");
    expect(clouds).toHaveLength(7);
  }
);

it(`displays all the provided clouds without taking into account the selected
  minimal distance, with userLocation is not provided`, () => {
  const { getAllByTestId, getByLabelText } = renderCloudsContainer(true);
  const slider = getByLabelText(/Select maximal distance/);
  fireEvent.change(slider, { target: { value: "8000" } });
  expect(getAllByTestId("cloud-name")).toHaveLength(4);
  fireEvent.change(slider, { target: { value: "12000" } });
  expect(getAllByTestId("cloud-name")).toHaveLength(6);
});

it(`displays only the clouds that are nearer than the selected minimal distance,
  when userLocation is provided`, () => {
  const { getAllByTestId, getByLabelText } = renderCloudsContainer(false);
  const slider = getByLabelText(/Select maximal distance/);
  fireEvent.change(slider, { target: { value: "8000" } });
  expect(getAllByTestId("cloud-name")).toHaveLength(7);
  fireEvent.change(slider, { target: { value: "12000" } });
  expect(getAllByTestId("cloud-name")).toHaveLength(7);
});

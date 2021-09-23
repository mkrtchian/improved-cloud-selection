import React from "react";
import { render } from "../testUtils";
import RegionsList from "../../components/RegionsList";

function renderRegionsList() {
  const organizedRegions = {
    Canada: [],
    "United States": [],
    Europe: [],
    Africa: [],
  };
  return render(
    <RegionsList
      organizedRegions={organizedRegions}
      setSelectedRegion={() => null}
      selectedRegion="Europe"
    />
  );
}

it("displays regions sorted alphabetically", () => {
  const { getAllByRole } = renderRegionsList();
  const regions = getAllByRole("button");
  expect(regions[0].textContent).toBe("Africa");
  expect(regions[1].textContent).toBe("Canada");
  expect(regions[2].textContent).toBe("Europe");
  expect(regions[3].textContent).toBe("United States");
});

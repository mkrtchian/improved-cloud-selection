import React from "react";
import { render, fireEvent } from "../testUtils";
import { Home } from "../../pages/index";

describe("Home page", () => {
  it("clicking button triggers alert", () => {
    const { getByText } = render(<Home />, {});
    window.alert = jest.fn();
    expect(getByText("Test Button")).toBeInTheDocument();
    fireEvent.click(getByText("Test Button"));
    expect(window.alert).toHaveBeenCalledWith("With typescript and Jest");
  });
});

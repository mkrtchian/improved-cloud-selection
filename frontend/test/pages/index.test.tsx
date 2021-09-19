import React from "react";
import { render } from "../testUtils";
import Home from "../../pages/index";

describe("Home page", () => {
  it("displays hello world", () => {
    const { getByText } = render(<Home />, {});
    expect(getByText("Hello world!")).toBeInTheDocument();
  });
});

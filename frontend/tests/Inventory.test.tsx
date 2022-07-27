import React from "react";
import { render } from "@testing-library/react";
import Inventory from "../src/components/Inventory";

describe("<Inventory />", () => {
  it("matches snapshot", () => {
    const utils = render(<Inventory />);
    expect(utils.container).toMatchSnapshot();
  });

  it("shows the props correctly", () => {
    const utils = render(<Inventory />);
    utils.getByText("인벤토리");
    utils.getByText("소유중");
    utils.getByText("찜");
  });
});

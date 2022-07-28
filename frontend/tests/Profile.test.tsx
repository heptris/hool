import React from "react";
import { render } from "@testing-library/react";
import Profile from "../src/components/Profile";

describe("<Profile />", () => {
  it("matches snapshot", () => {
    const utils = render(<Profile />);
    expect(utils.container).toMatchSnapshot();
  });

  it("shows the props correctly", () => {
    const utils = render(<Profile />);
    utils.getByText("나의 프로필");
    utils.getByText("포인트");
    utils.getByText("이모지");
    utils.getByText("친구");
  });
});

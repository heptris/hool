import React from "react";
import { render } from "@testing-library/react";
import Profile from "../src/components/accounts/Profile";

describe("<Profile />", () => {
  it("matches snapshot", () => {
    const utils = render(<Profile />);
    expect(utils.container).toMatchSnapshot();
  });

  it("shows the props correctly", () => {
    const utils = render(<Profile />);
    utils.getByText("나의 프로필");
    utils.getByText("큐브");
    utils.getByText("이모지");
    utils.getByText("친구");
  });
});

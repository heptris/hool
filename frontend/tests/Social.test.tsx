import React from "react";
import { render } from "@testing-library/react";
import Social from "../src/components/social/Social";

describe("<Social />", () => {
  it("matches snapshot", () => {
    const utils = render(<Social />);
    expect(utils.container).toMatchSnapshot();
  });

  it("shows the props correctly", () => {
    const utils = render(<Social />);
    utils.getByText("친구찾기");
    utils.getByText("친구와 함께하면 즐거움이 두배에요.");
    utils.getByText("내친구");
    utils.getByText("친구요청");
  });
});

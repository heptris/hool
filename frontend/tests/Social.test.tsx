import React from "react";
import { render } from "@testing-library/react";
import SocialPage from "../src/pages/SocialPage";

describe("<SocialPage />", () => {
  it("matches snapshot", () => {
    const utils = render(<SocialPage />);
    expect(utils.container).toMatchSnapshot();
  });

  it("shows the props correctly", () => {
    const utils = render(<SocialPage />);
    utils.getByText("친구찾기");
    utils.getByText("친구와 함께하면 즐거움이 두배에요.");
    utils.getByText("내친구");
    utils.getByText("친구요청");
  });
});

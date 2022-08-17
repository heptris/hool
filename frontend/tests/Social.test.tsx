import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import SocialPage from "../src/pages/social";

describe("<SocialPage />", () => {
  const queryClient = new QueryClient();
  it("matches snapshot", () => {
    const utils = render(
      <QueryClientProvider client={queryClient}>
        <SocialPage />
      </QueryClientProvider>
    );
    expect(utils.container).toMatchSnapshot();
  });

  it("shows the props correctly", () => {
    const utils = render(
      <QueryClientProvider client={queryClient}>
        <SocialPage />
      </QueryClientProvider>
    );
    utils.getByText("친구찾기");
    utils.getByText("친구와 함께하면 즐거움이 두배에요.");
    utils.getByText("내친구");
    utils.getByText("친구요청");
  });
});

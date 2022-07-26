import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "../src/components/Profile";

test("Renders profile component", () => {
  render(<Profile />);
});

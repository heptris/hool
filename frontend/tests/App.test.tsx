import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

test("Renders main element", () => {
  render(<App />);
});

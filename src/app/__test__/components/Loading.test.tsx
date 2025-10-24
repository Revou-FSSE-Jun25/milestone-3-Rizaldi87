import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loading from "@/components/Loading";

describe("loading component", () => {
  it("should render loading component correctly", () => {
    render(<Loading />);
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });
});

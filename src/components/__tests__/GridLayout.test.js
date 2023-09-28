import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { GridLayout } from "../GridLayout";

describe("GridLayout", () => {
  const mockImages = [
    {
      url: "sampleUrl1",
      alt_description: "sampleAlt1",
      description: "sampleDesc1",
      likes: 5,
      user: {
        profile_image: "sampleProfileImage1",
        username: "sampleUsername1",
        bio: "sampleBio1",
      },
    },
  ];

  it("renders the provided images", () => {
    render(<GridLayout images={mockImages} />);

    const imageElement = screen.getByAltText("sampleAlt1");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      expect.stringContaining("sampleUrl1")
    );
  });

  it("opens modal with correct info when an image is clicked", () => {
    render(<GridLayout images={mockImages} />);

    const imageElement = screen.getByAltText("sampleAlt1");
    fireEvent.click(imageElement);

    const modalProfileName = screen.getByText("sampleUsername1");
    expect(modalProfileName).toBeInTheDocument();

    const modalBio = screen.getByText("sampleBio1");
    expect(modalBio).toBeInTheDocument();

    // ... add more checks as necessary
  });
});

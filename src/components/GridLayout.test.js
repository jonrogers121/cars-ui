import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For the "toBeInTheDocument" matcher
import { GridLayout } from "./GridLayout"; // Adjust the import path accordingly

describe("GridLayout", () => {
  const mockImages = [
    { url: "testUrl1", alt_description: "alt1" },
    { url: "testUrl2", alt_description: "alt2" },
    { url: "testUrl3", alt_description: "alt3" },
  ];

  it("renders the provided images", () => {
    const { getByAltText } = render(<GridLayout images={mockImages} />);

    mockImages.forEach((image) => {
      expect(getByAltText(image.alt_description)).toBeInTheDocument();
    });
  });

  it("transforms image URLs for Cloudinary", () => {
    // Mock the environment variable for the test
    process.env.REACT_APP_CLOUDINARY_CLOUD_NAME = "test-cloud-name";

    const { getByAltText } = render(<GridLayout images={mockImages} />);

    mockImages.forEach((image) => {
      const renderedImage = getByAltText(image.alt_description);
      expect(renderedImage.src).toContain(
        `https://res.cloudinary.com/test-cloud-name/image/fetch/w_400,h_300,c_fill/${image.url}.webp`
      );
    });
  });
});
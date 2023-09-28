import React, { useMemo } from "react";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  --s: 300px;
  --m: 10px;
  --f: calc(1.732 * var(--s) + 4 * var(--m) - 1px);
`;

const Container = styled.div`
  font-size: 0; /* disable white space between inline block element */
  &::before {
    content: "";
    width: calc(var(--s) / 2 + var(--m));
    float: left;
    height: 120%;
    shape-outside: repeating-linear-gradient(
      #0000 0 calc(var(--f) - 3px),
      #000 0 var(--f)
    );
  }
`;

const ImageCard = styled.div`
  position: relative;
  width: var(--s);
  margin: var(--m);
  height: calc(var(--s) * 1.1547);
  display: inline-block;
  font-size: initial;
  clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
  margin-bottom: calc(var(--m) - var(--s) * 0.2885);
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const CloudinaryTransformedImage = ({ url, alt }) => {
  const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const TRANSFORMATION = "w_400,h_300,c_fill";
  const imageUrl = CLOUD_NAME
    ? `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${TRANSFORMATION}/${url}`
    : url;

  return <img src={imageUrl} alt={alt || "Transformed Image"} loading="lazy" />;
};

export const GridLayout = ({ images }) => {
  const renderedImages = useMemo(() => {
    return images.map(({ url, alt_description }, index) => (
      <ImageCard key={index}>
        <CloudinaryTransformedImage url={`${url}.webp`} alt={alt_description} />
      </ImageCard>
    ));
  }, [images]);

  return (
    <Main>
      <Container>{renderedImages}</Container>
    </Main>
  );
};
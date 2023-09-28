import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Icon, Modal } from 'semantic-ui-react'

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
cursor: pointer;
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

const ModalHeader = styled.div`
  display: flex;
  img {
    width: 120px;
    height: 120px;
    margin-right: 1rem;
    border-radius: 50%;
    border: 5px solid #333;
  }
  h2 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
    font-weight: 300;
  }
`;

const ModalContent = styled.div`
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  }
`;

const ModalActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  p {
    text-align: left;
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
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({})
  const renderedImages = useMemo(() => {
    return images.map(({ url, alt_description, description, likes, user: {profile_image, username, bio} }) => (
      <ImageCard key={url} onClick={() => {
        setModalOpen(true)
        setModalContent({
          likes,
          caption: description,
          profilePicture: `${profile_image}.webp`,
          profileName: username,
          profileCopy: bio,
          mainImage: `${url}.jpg`,
          mainImageAlt: alt_description
        })
      }}>
        <CloudinaryTransformedImage url={`${url}.webp`} alt={alt_description} />
      </ImageCard>
    ));
    
  }, [images]);

  const InfoModal = () => (
    <Modal
      onClose={() => setModalOpen(false)}
      onOpen={() => setModalOpen(true)}
      open={modalOpen}
      size='tiny'
    >
      <Modal.Header>
        <ModalHeader>
          <div>
            <img src={modalContent?.profilePicture} alt={modalContent?.profileName} />
          </div>
          <div>
            <h2>{modalContent?.profileName}</h2>
            <p>{modalContent?.profileCopy}</p>
          </div>
        </ModalHeader>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <ModalContent>
            <img src={modalContent?.mainImage} alt={modalContent?.mainImageAlt} />
          </ModalContent>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <ModalActions>
          <p><Icon name='like' color="red" />{modalContent?.likes}</p>
          <p>{modalContent?.caption}</p>     
        </ModalActions>
      </Modal.Actions>
    </Modal>
  )

  return (
    <Main>
     <InfoModal />
      <Container>{renderedImages}</Container>
    </Main>
  );
};
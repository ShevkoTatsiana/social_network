import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import {ImageType} from '../types';

type Props = {
  image: ImageType,
  url: string,
  hasDeleteButton: boolean,
  show: boolean,
  onDelete: () => void,
  onHide: () => void
};

export const ImagePreviewModalComponent = ({
  image, 
  url,
  hasDeleteButton, 
  onDelete,
  show,
  onHide}: Props) => {
  const date = new Date(image?.createdAt);
  const dateString = date?.toString().split('GMT')[0];
  const handleOnDelete = () => {
    onDelete();
    onHide();
  };

  return (
    <Modal show={show} 
           onHide={onHide}
           className="modal-preview">
        <Modal.Header closeButton>
          <Modal.Title>{image?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="preview-component"> 
            <Image src={url}
                        alt={image?.title}
                        className="preview-component__image"/>
            <div>{image?.author_name}, {dateString}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
        {hasDeleteButton && (
          <Button variant="primary" onClick={handleOnDelete}>
            Delete Image
          </Button>
        )}
        </Modal.Footer>
      </Modal>
  );
}


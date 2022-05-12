import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import {UploadImageModalComponent} from './UploadImageModal.component';
import {ImagePreviewModalComponent} from './ImagePreviewModal.component';

export const GalleryComponent = ({
  error, 
  loading, 
  images, 
  currentUserName, 
  isCurrentUserInGroup,
  groupId, 
  onSubmitImage, 
  onDeleteImage
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [currentImage, setCurrentImage] = useState();
  const handleCloseUpload = () => setShowUploadModal(false);
  const handleShowUpload = () => setShowUploadModal(true);
  const handleClosePreview = () => setShowImagePreview(false);
  const handleShowPreview = (image) => {
    setCurrentImage(image);
    setShowImagePreview(true);
  };
  const isPossibleToDelete = (authorName) => {
    return isCurrentUserInGroup && authorName === currentUserName
  };
  const imageURL = (url) => {
    return `${process.env.REACT_APP_PUBLIC_URL}/images/${url}`
  };
 
  return (
    <div className="gallery-component">
      {!!error && (
        <Alert show={!!error?.message}
             variant="danger">   
        {error.message}
      </Alert> 
      )}  
      {loading && (
                <Spinner animation="border"
                         variant="info"/>
            )}   
      <h3 className="gallery-component__title">Family's gallery:</h3>  
      {isCurrentUserInGroup && (
        <div className="gallery-component__actions">
          <Button variant="outline-primary" onClick={handleShowUpload}>
            Upload new image
          </Button>
          <UploadImageModalComponent currentUserName={currentUserName}
                                     groupId={groupId}
                                     show={showUploadModal}
                                     onHide={handleCloseUpload}
                                     onSubmitImage={onSubmitImage}/>
        </div>
      )}
      {!!images?.length ? (
        <div className="gallery-component__block">
          {images.map((image) => (
            <div className="gallery-item">
              <Button variant="light" 
                      onClick={() => handleShowPreview(image)}
                      className="gallery-item__button">
                <Image src={imageURL(image.gallery_image)}
                       alt={image.title}
                       className="gallery-item__image"/>
              </Button>
            </div>
          ))}
          <ImagePreviewModalComponent image={currentImage}
                                      url={imageURL(currentImage?.gallery_image)}
                                      show={showImagePreview}
                                      onHide={handleClosePreview}
                                      hasDeleteButton={isPossibleToDelete(currentImage?.author_name)}
                                      onDelete={() => onDeleteImage(currentImage?._id)}/>
        </div>
      ) : (
        <div className="images-component__empty">There are no family photo yet...</div>
      )}
    </div>
  );
}


import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form'; 
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const UploadImageModalComponent = ({
  onSubmitImage, 
  currentUserName, 
  groupId,
  show,
  onHide}) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful  } } = useForm();
  const [image, setImage] = useState('');

  const onSubmit = (data) => {
    const formData = new FormData();
    data.gallery_image = image;
    data.author_name = currentUserName;
    data.group_id = groupId;
    for (let key in data) {
      formData.append(key, data[key])
    };
    onSubmitImage(formData);
    onHide();
  };
  const onFileUpload = (e) => {
    setImage(e.target.files[0]);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Upload new image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="gallery-form-component"> 
            <form noValidate onSubmit={handleSubmit(onSubmit)}
                            encType="multipart/form-data">
                  <FloatingLabel label="Title">
                      <Form.Control placeholder="Title"
                                    isInvalid={errors?.title} 
                                    {...register("title", {
                                      required: {value: true, message: "This is a required field"}
                                    })} />
                  <Form.Control.Feedback type="invalid">
                    {errors?.title?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
              <Form.Label htmlFor="gallery_image">Upload a Recipe Photo here</Form.Label>
              <Form.Control type="file" 
                    className="gallery-form-component__photo" 
                    name="gallery_image"
                    {...register("gallery_image")}              
                    onChange={onFileUpload}/>
              <Form.Text id="filesHelpBlock" muted
                        className="gallery-form-component__photo-note">
                You can upload '.jpg', '.jpeg' or '.png' files here.
              </Form.Text>
              <Button variant="primary" 
                      type="submit"
                      className="form-submit">
                Upload
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
  );
}


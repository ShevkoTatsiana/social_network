import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form'; 
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button';

export const CreateTreeComponent = ({onSubmitMember, groupId, members, currentItem, currentLevel}) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful  } } = useForm();
  //const [currentLevel, setCurrentLevel] = useState(0);
  const [operation, setOperation] = useState(0);
  const [photo, setPhoto] = useState('');

  const isDisabled = members?.length && !operation;

  const onSubmit = (data) => {
    const formData = new FormData();
    data.photo = photo;
    data.group_id = groupId;
    data.id = Date.now();
    data.level = currentLevel;
    data.parents = [];
    data.children = [];
    data.siblings = [];
    data.partner = '';
    console.log(operation);
    switch (operation) {
      case 1:
        console.log('par', data['parents']);
        data['parents'].push(data.id);
        data.level = currentLevel + 1;
        break;
      case 2:
        console.log('ch', data['children']);
        data['children'].push(data.id);
        data.level = currentLevel - 1;
        break;
      case 3:
        console.log('partn', data.partner);
        data.partner = data.id;
        break;
      case 4:
        console.log('sib', data['siblings']);
        data['siblings'].push(data.id);
        break;
      default:
        break;
    }
    // for (let key in data) {
    //   formData.append(key, data[key])
    // };
    //onSubmitMember(formData);
    onSubmitMember(data, currentItem, operation);
    setOperation(0);
  };

  const onFileUpload = (e) => {
    setPhoto(e.target.files[0]);
  };
  
  const onAddChild = () => {
    //setCurrentLevel(currentLevel-1);
    setOperation(1);
  };

  const onAddParents = () => {
    //setCurrentLevel(currentLevel+1);
    setOperation(2);
  };

  const onAddPartner = () => {
    setOperation(3);
  };

  const onAddSibling = () => {
    setOperation(4);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="member-form-component"> 
      {members?.length ? (
        <div>
          <Button variant="primary" 
                onClick={onAddChild}>
          Add child
        </Button>
        <Button variant="primary" 
                type="submit"
                onClick={onAddParents}>
          Add parents
        </Button>
        <Button variant="primary" 
                type="submit"
                onClick={onAddSibling}>
          Add siblings
        </Button>
        <Button variant="primary" 
                type="submit"
                onClick={onAddPartner}>
          Add Partner
        </Button>
        </div>
      ) : (
        <h4 className="member-form-component__note">Add your profile as a first family member</h4>
      )}
      <form noValidate onSubmit={handleSubmit(onSubmit)}
                       encType="multipart/form-data">
            <FloatingLabel label="Full Name">
                <Form.Control placeholder="Full Name"
                              isInvalid={errors?.name} 
                              disabled={isDisabled}
                              {...register("name", {
                                required: {value: true, message: "This is a required field"}
                               })} />
            <Form.Control.Feedback type="invalid">
              {errors?.name?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        <Form.Label htmlFor="recipe_photo">Upload a Photo here</Form.Label>
        <Form.Control type="file" 
               className="member-form-component__photo" 
               name="photo"
               disabled={isDisabled}
               {...register("photo")}              
               onChange={onFileUpload}/>
        <Form.Text id="filesHelpBlock" muted
                   className="member-form-component__photo-note">
          You can upload '.jpg', '.jpeg' or '.png' files here.
        </Form.Text>
        <FloatingLabel label="Dates">
          <Form.Control placeholder="Dates"
                        className="member-form-component__dates"
                        disabled={isDisabled}
                        isInvalid={errors?.dates} 
                        {...register("dates", {
                          required: {value: true, message: "This is a required field"}
                        })} />
            <Form.Control.Feedback type="invalid">
              {errors?.dates?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel label="Additional Info">
          <Form.Control placeholder="Additional Info"
                        isInvalid={errors?.info} 
                        as="textarea" 
                        disabled={isDisabled}
                        rows={4}
                        className="member-form-component__info"
                        {...register("info")} />
            <Form.Control.Feedback type="invalid">
              {errors?.info?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        <Button variant="primary" 
                type="submit"
                className="form-submit">
          Add
        </Button>
      </form>
    </div>
  );
}


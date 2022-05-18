import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form'; 
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button';

export const CreateTreeComponent = ({onSubmitMember, groupId, members, currentItem, currentLevel}) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful  } } = useForm();
  const [operation, setOperation] = useState(0);
  const [photo, setPhoto] = useState('');
  const currentMember = members.find((item) => item.id === currentItem);

  const isDisabled = members?.length && !operation && !currentItem;

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
    switch (operation) {
      case 1:
        data['parents'].push(currentItem);
        // if current item has partner they also should be added as parent to new item
        if(!!currentMember.partner) {
          data['parents'].push(currentMember.partner)
        };
        data.level = currentLevel + 1;
        break;
      case 2:
        data['children'].push(currentItem);
        // if current item has siblings they also should be added as children to new Parent item
        if(currentMember.siblings.length) {
          data['children'] = [currentItem, ...currentMember.siblings];
        }
        data.level = currentLevel - 1;
        break;
      case 3:
        data.partner = currentItem;
        //data.id = `${currentItem}-${Date.now()}`
        break;
      case 4:
        data['siblings'].push(currentItem);
        // if current item has parents they also should be added to a new sibling item
        if(currentMember.parents.length) {
          data.parents = [...currentMember.parents];
        }
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="member-form-component"> 
      {members?.length ? (
        <div>
          <Button variant="outline-primary" 
                  className="member-form-component__action"
                  onClick={() => setOperation(1)}>
          Add child
        </Button>
        <Button variant="outline-primary" 
                className="member-form-component__action"
                onClick={() => setOperation(2)}>
          Add parents
        </Button>
        <Button variant="outline-primary" 
                className="member-form-component__action"
                onClick={() => setOperation(4)}>
          Add siblings
        </Button>
        <Button variant="outline-primary" 
                className="member-form-component__action"
                onClick={() => setOperation(3)}>
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
                        {...register("dates")} />
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


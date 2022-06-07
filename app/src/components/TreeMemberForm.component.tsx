import React, { useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button';

import {MemberType} from '../types';

type FormValue = {
  name: string,
  dates: string,
  info: string,
  photo: string,
};

type MemberWithIdType = Omit<MemberType, "_id"> & {
  _id: string
};

type Props = {
  member?: MemberType | MemberWithIdType,
  isDisabled: boolean,
  onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void,
  onSubmitMember: (data: FormValue) => void
};

export const TreeMemberFormComponent = ({ onSubmitMember, member, isDisabled, onFileUpload }: Props) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<FormValue>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="member-form-component">
      <form noValidate onSubmit={handleSubmit(onSubmitMember)}
        encType="multipart/form-data">
        <FloatingLabel label="Full Name">
          <Form.Control placeholder="Full Name"
            defaultValue={member?.name || ''}
            isInvalid={!!errors?.name}
            disabled={isDisabled}
            {...register("name", {
              required: { value: true, message: "This is a required field" }
            })} />
          <Form.Control.Feedback type="invalid">
            {errors?.name?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        <Form.Label htmlFor="recipe_photo">Upload a Photo here</Form.Label>
        <Form.Control type="file"
          className="member-form-component__photo"
          disabled={isDisabled}
          {...register("photo")}
          onChange={onFileUpload} />
        <Form.Text id="filesHelpBlock" muted
          className="member-form-component__photo-note">
          You can upload '.jpg', '.jpeg' or '.png' files here.
        </Form.Text>
        <FloatingLabel label="Dates">
          <Form.Control placeholder="Dates"
            className="member-form-component__dates"
            disabled={isDisabled}
            defaultValue={member?.dates || ''}
            isInvalid={!!errors?.dates}
            {...register("dates")} />
          <Form.Control.Feedback type="invalid">
            {errors?.dates?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel label="Additional Info">
          <Form.Control placeholder="Additional Info"
            isInvalid={!!errors?.info}
            as="textarea"
            defaultValue={member?.info || ''}
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
          className="member-form-component__submit">
          Add
        </Button>
      </form>
    </div>
  );
}


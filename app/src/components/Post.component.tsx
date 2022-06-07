import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form'; 
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/esm/Button';
import { GroupPostComponent } from './GroupPost.component';
import {ValidationError, PostType} from '../types';

type FormValues = {
  text: string
}
type Props = {
  posts: PostType[],
  error: ValidationError | undefined,
  loading: boolean,
  currentUserName: string | undefined,
  onSubmitPost: (post: FormValues) => Promise<void>
};


export const PostComponent = ({error, loading, posts, currentUserName,  onSubmitPost}: Props) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful  } } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    onSubmitPost(data)
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ text: '' });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="post-component">
      {!!error && (
        <Alert show={!!error?.message}
             variant="danger">   
        {error.message}
      </Alert> 
      )}  
      {loading && (
                <Spinner animation="border"
                         className="post-component__loader"
                         variant="info"/>
            )}   
      <h3 className="post-component__title">Family's conversation:</h3>  
      {!!posts?.length ? (
        <>
          {posts.map((post) => (
            <GroupPostComponent post={post}
                                active={currentUserName === post.author_name}
                                key={post._id}/>
          ))}
        </>
      ) : (
        <div className="post-component__empty">Be first to share your post</div>
      )}
      <div className="post-component__note">Write a message...</div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}
                        className="post-component__form">
        <FloatingLabel label="Message">
          <Form.Control placeholder="Message"
                        isInvalid={!!errors?.text} 
                        {...register("text", {
                          required: {value: true, message: "This is a required field"}
                        })} />
            <Form.Control.Feedback type="invalid">
              {errors?.text?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        <Button variant="primary" 
                type="submit"
                className="form-submit">
          Publish
        </Button>
      </form>
    </div>
  );
}


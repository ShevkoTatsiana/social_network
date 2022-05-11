import React, {useEffect} from 'react';
import { useForm, useFormState } from 'react-hook-form'; 
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/esm/Button';
import { GroupPostComponent } from './GroupPost.component';

export const PostComponent = ({error, loading, posts, currentUserName,  onSubmitPost}) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful  } } = useForm();

  const onSubmit = (data) => {
    onSubmitPost(data)
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ post: '' });
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
                         className="group-component__loader"
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
                        isInvalid={errors?.name} 
                        {...register("post", {
                          required: {value: true, message: "This is a required field"}
                        })} />
            <Form.Control.Feedback type="invalid">
              {errors?.post?.message}
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


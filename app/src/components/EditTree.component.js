import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {TreeMemberFormComponent} from './TreeMemberForm.component';

export const EditTreeComponent = ({onSubmit, show, member, onHide}) => {
  const [photo, setPhoto] = useState('');

  const onSubmitMember = (data) => {
    member.photo = photo;
    member.name = data.name;
    member.dates = data.dates;
    member.info = data.info;
    onSubmit(member, member._id);
    onHide();
  };

  const onFileUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
      <Modal show={show} 
           onHide={onHide}
           className="edit-tree-component">
        <Modal.Header>
          <Button onClick={onHide}
                  className="edit-tree-component__cancel"
                  variant="outline-secondary">
             Cancel
          </Button>
        </Modal.Header>
        <Modal.Body>
          <TreeMemberFormComponent onSubmitMember={onSubmitMember}
                                   member={member}
                                   isDisabled={false}
                                   onFileUpload={onFileUpload}/>
        </Modal.Body>
      </Modal>

  );
}


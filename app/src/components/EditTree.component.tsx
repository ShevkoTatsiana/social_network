import React, {useState, ChangeEvent} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {TreeMemberFormComponent} from './TreeMemberForm.component';
import {MemberType} from '../types';

type Props = {
  member: MemberType,
  show: boolean,
  onHide: () => void,
  onSubmit: (data: MemberType, id: string) => void
};
type FormValues = {
  name: string,
  dates: string,
  info: string,
  photo: string,
};

export const EditTreeComponent = ({onSubmit, show, member, onHide}: Props) => {
  const [photo, setPhoto] = useState<File | string>('');

  const onSubmitMember = (data: FormValues) => {
    member.photo = photo;
    member.name = data.name;
    member.dates = data.dates;
    member.info = data.info;
    if(!!member._id) {
      onSubmit(member, member._id);
    }
    onHide();
  };

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
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


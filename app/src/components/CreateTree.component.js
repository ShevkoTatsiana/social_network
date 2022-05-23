import React, {useState} from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/Button';

import {TreeMemberFormComponent} from './TreeMemberForm.component';

export const CreateTreeComponent = ({onSubmitMember, groupId, members, currentItem, currentLevel}) => {
  const [operation, setOperation] = useState(0);
  const [photo, setPhoto] = useState('');
  const currentMember = members.find((item) => item._id === currentItem);
  const isDisabled = !members?.length || !operation || !currentItem;

  const onSubmit = (data) => {
    const formData = new FormData();
    data.photo = photo;
    data.group_id = groupId;
    data.level = currentLevel;
    data.parents = [];
    data.children = [];
    data.siblings = [];
    data.partner = '';
    switch (operation) {
      // add child operation
      case 1:
        data['parents'].push(currentItem);
        // if current item has partner they also should be added as parent to new item
        if(!!currentMember.partner) {
          data['parents'].push(currentMember.partner)
        };
        data.level = currentLevel + 1;
        break;
      // add parent operation
      case 2:
        data['children'].push(currentItem);
        // if current item has siblings they also should be added as children to new Parent item
        if(currentMember.siblings.length) {
          data['children'] = [currentItem, ...currentMember.siblings];
        }
        data.level = currentLevel - 1;
        break;
      // add partner operation
      case 3:
        data.partner = currentItem;
        // if current item has children they also should be added as children to partner item
        if(currentMember.children.length) {
          data['children'] = [...currentMember.children];
        }
        break;
      // add siblings operation
      case 4:
        data['siblings'].push(currentItem);
        // if current item has parents they also should be added to a new sibling item
        if(currentMember.parents.length) {
          data.parents = [...currentMember.parents];
        }
        break;
      default:  
        break;
    };
    for (let key in data) {
        formData.append(key, data[key])     
    };
    onSubmitMember(formData, currentItem, operation);
    setOperation(0);
  };

  const onFileUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <div className="create-tree-component"> 
      {members?.length ? (
        <div className="create-tree-component__actions">
          <Button variant="outline-primary" 
                  className={classNames('create-tree-component__action', {'active': operation === 1})}
                  onClick={() => setOperation(1)}>
          Add child
        </Button>
        <Button variant="outline-primary" 
                className={classNames('create-tree-component__action', {'active': operation === 2})}
                onClick={() => setOperation(2)}>
          Add parents
        </Button>
        <Button variant="outline-primary" 
                className={classNames('create-tree-component__action', {'active': operation === 4})}
                onClick={() => setOperation(4)}>
          Add siblings
        </Button>
        <Button variant="outline-primary" 
                className={classNames('create-tree-component__action', {'active': operation === 3})}
                onClick={() => setOperation(3)}>
          Add partner
        </Button>
        </div>
      ) : (
        <h4 className="create-tree-component__note">Add your profile as a first family member</h4>
      )}
      <TreeMemberFormComponent onSubmitMember={onSubmit}
                               isDisabled={isDisabled}
                               onFileUpload={onFileUpload}/>
    </div>
  );
}


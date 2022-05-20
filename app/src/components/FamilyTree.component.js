import React, {useState, useLayoutEffect, useCallback, useRef} from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { toPng } from 'html-to-image';

import { CreateTreeComponent } from './CreateTree.component';
import { EditTreeComponent } from './EditTree.component';
import { drawLine, clearLines } from '../utils/drawLine';
import { groupBy, sortLevel } from '../utils/groupBy';
import RemoveIcon from '../resources/remove.svg';
import EditIcon from '../resources/edit.svg';

const START_TREE_LEVEL = 5;

export const FamilyTreeComponent = ({
  error, 
  loading, 
  members,  
  isCurrentUserInGroup,
  groupId, 
  onSubmitMember, 
  onDeleteMember,
  onUpdateMember
}) => {
  const [currentItem, setCurrentItem] = useState();
  const [currentLevel, setCurrentLevel] = useState(START_TREE_LEVEL);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editMember, setEditMember] = useState();
  const [deleteMember, setDeleteMember] = useState();
  const treeRef = useRef();
  const memberButtonClassName = (id) => {
    const className = 'family-component__button';
    if(currentItem === id) className.concat(' ','family-component__button--active');
    return className;
  };

  const grouppedMembers =  Object.values(groupBy(members, 'level'));
  const grouppedSortedMembers = sortLevel(grouppedMembers);
  const imageURL = (photo) => {
    if(!!photo) {
      return `${process.env.REACT_APP_PUBLIC_URL}/images/${photo}`
    }
      return `${process.env.REACT_APP_PUBLIC_URL}/images/profile_placeholder.png`;
  };

  const findVertical = useCallback(() => {
    clearLines();
    members?.forEach((member) => {
      if(member.children.length && !!member.children[0]) {
        const children = member.children;
        if(!!member && !!children) {
          children.forEach(child => drawVertical(member, child));
        }
      }
    })
  }, [members]);

  const drawVertical = (item, child) => {
    const itemEl = document.getElementById(item._id);
    const childEl = document.getElementById(child);
    const line = drawLine(itemEl, childEl, '#6f42c1', 2);
    document.body.appendChild(line);
  };

  const onSaveTree = useCallback(() => {
    if (treeRef.current === null) {
      return
    }
    toPng(treeRef.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-family-tree.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      })
  }, [treeRef]);

  const handleOnDelete = () => {
    onDeleteMember(deleteMember);
    setShowDelete(false);
  };

  useLayoutEffect(() => {
    findVertical();
  }, [members]);

  return (
    <div className="family-component">
      {!!error && (
        <Alert show={!!error?.message}
             variant="danger">   
        {error.message}
      </Alert> 
      )}  
      {loading && (
        <div className="family-component__loader">
          <Spinner animation="border"
                    variant="info"/>
        </div>
      )}   
      <h3 className="family-component__title">Our Family Tree</h3>  
      {!!members?.length ? (
        <>
        <div className="family-component__download">
          <Button onClick={onSaveTree}>
            Download tree
          </Button>
        </div>
        <div className="family-component__group"
             ref={treeRef}>
        {grouppedSortedMembers?.map((group) => (
            <div style={{order: group[0].level}}
                 className="family-component__level">
              {group?.map((member) => (
                <div className="family-component__block">
                  <span className="family-component__edit"
                        onClick={() => {
                          setShowEdit(true);
                          setEditMember(member)}}>
                    <Image src={EditIcon}
                           className="family-component__edit-image"/>
                  </span>
                    <Button variant="light"
                            className={memberButtonClassName(member._id, member.partner)}
                            key={member._id}
                            id={member._id}
                            onClick={()=> {
                              setCurrentItem(member._id);
                              setCurrentLevel(member.level)
                            }}>
                      <Image src={imageURL(member.photo)}
                             roundedCircle={true}
                             className="family-component__image"/> 
                      <div className="family-component__name">                       
                          {member.name}                  
                      </div>
                      <div className="family-component__dates"><em>{member.dates}</em></div>
                      {member.info && (
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic"
                                           className="family-component__info-toggle">
                            Info
                          </Dropdown.Toggle>                      
                          <Dropdown.Menu>
                            <div className="family-component__info">{member.info}</div>
                            </Dropdown.Menu>
                        </Dropdown>
                      )}
                      
                    </Button>
                    <span className="family-component__delete"
                          onClick={() => {
                            setDeleteMember(member._id);
                            setShowDelete(true);
                          }}>
                            <Image src={RemoveIcon}
                                   className="family-component__delete-image"/>
                          </span>
                </div>
              ))}
              <EditTreeComponent show={showEdit}
                                     member={editMember}
                                     onHide={() => setShowEdit(false)}
                                     onSubmit={onUpdateMember}/>
            </div>
        ))}  
        </div>
        </>
      ) : (
        <div className="family-component__empty">You can create your family tree</div>
      )}
      {isCurrentUserInGroup && (
        <CreateTreeComponent onSubmitMember={onSubmitMember}
                             groupId={groupId}
                             currentItem={currentItem}
                             currentLevel={currentLevel}
                             members={members}/>
      )}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>    
        <Modal.Body>Are you sure you want to delete a member?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOnDelete}>
            Delete
          </Button>
        </Modal.Footer>
    </Modal>
    </div>
  );
}


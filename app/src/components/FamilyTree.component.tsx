import React, {useState, useLayoutEffect, useCallback, useRef} from 'react';
import classNames from 'classnames';
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
import ImagePlaceholder from '../resources/profile_placeholder.png';
import {MemberType, ErrorType} from '../types';

const START_TREE_LEVEL = 5;

type Props = {
  error: ErrorType | undefined, 
  loading: boolean, 
  members: MemberType[],  
  isCurrentUserInGroup: boolean,
  groupId?: string, 
  onSubmitMember: (data: FormData, currentItem: string, operation: number) => void, 
  onDeleteMember: (id: string) => void,
  onUpdateMember: (item: MemberType, id: string) => void
};

export const FamilyTreeComponent = ({
  error, 
  loading, 
  members,  
  isCurrentUserInGroup,
  groupId, 
  onSubmitMember, 
  onDeleteMember,
  onUpdateMember
}: Props) => {
  const [currentItem, setCurrentItem] = useState<string>('');
  const [currentLevel, setCurrentLevel] = useState(START_TREE_LEVEL);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editMember, setEditMember] = useState<MemberType>();
  const [deleteMember, setDeleteMember] = useState<string>('');
  const treeRef = useRef(null);

  const grouppedMembers:Array<MemberType[]> =  Object.values(groupBy(members, 'level'));
  const grouppedSortedMembers = sortLevel(grouppedMembers);
  const imageURL = (photo: string | File) => (photo ? photo : ImagePlaceholder);

  const findVertical = useCallback(() => {
    clearLines(treeRef.current);
    members?.forEach((member) => {
      if(member.children.length && !!member.children[0]) {
        const children = member.children;
        if(!!member && !!children) {
          children.forEach(child => drawVertical(member, child));
        }
      }
    })
  }, [members]);

  const drawVertical = (item: MemberType, child: string) => {
    if(!item._id) return;
    const itemEl = document.getElementById(item._id);
    const childEl = document.getElementById(child);
    if(!itemEl || !childEl) return;
    const line = drawLine(itemEl, childEl, '#6f42c1', 2);
    itemEl.appendChild(line);
  };

  const filter = (node: HTMLElement)=>{
    const exclusionClasses = ['dropdown', 'family-component__edit', 'family-component__delete'];
    return !exclusionClasses.some(classname=>!!node.classList && node.classList.contains(classname));
  }

  const onSaveTree = useCallback(() => {
    if (treeRef.current === null) {
      return
    }
    toPng(treeRef.current, { cacheBust: true, imagePlaceholder: ImagePlaceholder, filter: filter})
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
        <div className="family-component__scrollable">
        <div className="family-component__group"
             ref={treeRef}>
        {grouppedSortedMembers?.map((group: MemberType[]) => (
            <div style={{order: group[0].level}}
                 className="family-component__level"
                 key={group[0].level}>
              {group?.map((member) => (
                <div className="family-component__block"
                     key={member.name}>
                  <span className="family-component__edit"
                        onClick={() => {
                          setShowEdit(true);
                          setEditMember(member)}}>
                    <Image src={EditIcon}
                           className="family-component__edit-image"/>
                  </span>
                    <Button variant="light"
                            className={classNames('family-component__button', {'active': member._id===currentItem})}
                            key={member._id}
                            id={member._id}
                            onClick={()=> {
                              setCurrentItem(member._id || '');
                              setCurrentLevel(member.level)
                            }}>
                      <Image src={imageURL(member.photo)}
                             roundedCircle={true}
                             className="family-component__image"/> 
                      <div className="family-component__name">                       
                          {member.name}                  
                      </div>
                      {!!member.dates && member.dates !== "undefined" && (
                        <div className="family-component__dates"><em>{member.dates}</em></div>
                      )}                      
                      {!!member.info && member.info !== "undefined" && (
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic"
                                           as="span"
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
                            setDeleteMember(member._id || '');
                            setShowDelete(true);
                          }}>
                            <Image src={RemoveIcon}
                                   className="family-component__delete-image"/>
                          </span>
                </div>
              ))}
              {!!editMember && (
                <EditTreeComponent show={showEdit}
                                     member={editMember}
                                     onHide={() => setShowEdit(false)}
                                     onSubmit={onUpdateMember}/>
              )}              
            </div>
        ))}  
        </div>
        </div>
        </>
      ) : (
        <div className="family-component__empty">You can create your family tree</div>
      )}
      {isCurrentUserInGroup && !!groupId && (
        <CreateTreeComponent onSubmitMember={onSubmitMember}
                             currentItem={currentItem}
                             currentLevel={currentLevel}
                             groupId={groupId}
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


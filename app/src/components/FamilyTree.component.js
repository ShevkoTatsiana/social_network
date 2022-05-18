import React, {useState, useLayoutEffect, useCallback} from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import { CreateTreeComponent } from './CreateTree.component';
import { drawLine, clearLines } from '../utils/drawLine';
import { groupBy, sortLevel } from '../utils/groupBy';

const START_TREE_LEVEL = 5;

export const FamilyTreeComponent = ({
  error, 
  loading, 
  members, 
  currentUserName, 
  isCurrentUserInGroup,
  groupId, 
  onSubmitMember, 
  onDeleteMember
}) => {
  const [currentItem, setCurrentItem] = useState();
  const [currentLevel, setCurrentLevel] = useState(START_TREE_LEVEL);
  const memberButtonClassName = (id) => {
    const className = 'family-component__button';
    if(currentItem === id) className.concat(' ','family-component__button--active');
    return className;
  };

  const grouppedMembers =  Object.values(groupBy(members, 'level'));
  const grouppedSortedMembers = sortLevel(grouppedMembers);

  const findVertical = useCallback(() => {
    clearLines();
    members?.forEach((member) => {
      if(member.children.length) {
        const children = member.children;
        if(!!member && !!children) {
          children.forEach(child => drawVertical(member, child));
        }
      }
    })
  }, [members]);

  const drawVertical = (item, child) => {
    const itemEl = document.getElementById(item.id);
    const childEl = document.getElementById(child);
    const line = drawLine(itemEl, childEl, '#6f42c1', 2);
    document.body.appendChild(line);
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
        <div className="family-component__group">
        {grouppedSortedMembers?.map((group) => (
            <div style={{order: group[0].level}}
                 className="family-component__level">
              {group?.map((member) => (
                <div className="family-component__block">
                    <Button variant="light"
                            className={memberButtonClassName(member.id, member.partner)}
                            key={member.id}
                            id={member.id}
                            onClick={()=> {
                              setCurrentItem(member.id);
                              setCurrentLevel(member.level)
                            }}>
                        {member.name}
                    </Button>
                    <span className="family-component__delete"
                          onClick={() => onDeleteMember(member.id)}>x</span>
                </div>
              ))}
            </div>
        ))}  
        </div>
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
    </div>
  );
}


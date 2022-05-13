import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import { CreateTreeComponent } from './CreateTree.component';

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
  const [currentLevel, setCurrentLevel] = useState(5);
  const groupBy = (arr, property) => {
    return arr?.reduce(function(memo, x) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }
  const grouppedMembers =  Object.values(groupBy(members, 'level'));
console.log(members);
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
        {grouppedMembers.map((group) => (
            <div style={{order: group[0].level}}>
              {group?.map((member) => (
                <Button variant="light"
                        className={currentItem === member.id? 'active' : ''}
                        onClick={()=> {
                          setCurrentItem(member.id);
                          setCurrentLevel(member.level)
                        }}>{member.name}
                </Button>
              ))}
            </div>
        ))}  
        </div>
      ) : (
        <div className="family-component__empty">You can create your family tree</div>
        // <div className="template">
        //   jlk
        // </div>
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


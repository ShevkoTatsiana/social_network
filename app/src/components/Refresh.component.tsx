import React from 'react';

import Button from 'react-bootstrap/Button';

type Props = {
  updateWaiting: boolean,
  handleUpdate: () => void
};

export const RefreshComponent = ({updateWaiting, handleUpdate}: Props) => {
  if (!updateWaiting) return <></>
  return (
    <div className="refresh-component">
      <strong>Update waiting!</strong> Click to update the app to the latest version <Button onClick={handleUpdate} variant="primary">Update</Button>
    </div>
  )
}


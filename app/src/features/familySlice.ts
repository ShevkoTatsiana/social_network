import { createSlice } from '@reduxjs/toolkit';
import {UserType} from '../types';

type currentUserType = null | UserType;

const userInitState: currentUserType = null;

export const familySlice = createSlice({
    name: 'family',
    initialState: {
      currentUser: userInitState,
      isCurrentUserInGroup: false,
      groupId: ''
    },
    reducers: {
      setCurrentUser: (state, action) => {
        state.currentUser = action.payload
      },
      setGroupId: (state, action) => {
        state.groupId = action.payload
      },
      setIsCurrentUserInGroup: (state, action) => {
        state.isCurrentUserInGroup = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setCurrentUser, setGroupId, setIsCurrentUserInGroup } = familySlice.actions
  
  export default familySlice.reducer
import { createSlice } from '@reduxjs/toolkit'



const orgSlice = createSlice({
  name: 'orgs',
  initialState: [],
  reducers: {
    addOrg: (state, action) => {
      state.push(action.payload);
      console.log(1)
      console.log(state)
    },
    addMembers: (state, action) => {
      const { orgId, member } = action.payload;
      const index = state.findIndex(obj => obj.id === orgId);
      console.log(state)
      if (index !== -1) {
        if (!state[index].members) {
          state[index].members = []; 
        }
       
        state[index].members.push(...member);
        
      }
    },
    removeOrg: (state, action) => {
      
      state.splice(action.payload, 1);
    },
    addProjectToOrg: (state, action) => {
      const { orgId, projectId } = action.payload;
      const org = state.find(org => org.id === orgId);
      if (org) {
        org.projectIds.push(projectId);
      }
    },
    removeProjectFromOrg: (state, action) => {
      const { orgId, projectId } = action.payload;
      const org = state.find(org => org.id === orgId);
      if (org) {
        org.projectId = org.projectIds.filter(_id => _id !== projectId);
      }
    },
    removeAllProjectsFromOrg: (state, action) => {
      const org = state.find(org => org.id === action.payload);
      if (org) {
        org.projectIds = [];
      }
    }
  },
});


export const { addOrg, addMembers, removeOrg, addProjectToOrg, removeProjectFromOrg } = orgSlice.actions;

export default orgSlice.reducer;

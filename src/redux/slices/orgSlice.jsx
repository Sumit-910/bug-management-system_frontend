import { createSlice } from '@reduxjs/toolkit'



const orgSlice = createSlice({
  name: 'orgs',
  initialState: [],
  reducers: {
    addOrg: (state, action) => {
      // console.log(action.payload);
      state.push(action.payload);
      console.log(1)
      console.log(state)
    },
    addMembers: (state, action) => {
      const { orgName, member } = action.payload;
      const index = state.findIndex(obj => obj.name === orgName);
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
      const { orgName, projectName } = action.payload;
      const org = state.find(org => org.name === orgName);
      if (org) {
        org.projectName.push(projectName);
      }
    },
    removeProjectFromOrg: (state, action) => {
      const { orgName, projectName } = action.payload;
      const org = state.find(org => org.name === orgName);
      if (org) {
        org.projectName = org.projectName.filter(name => name !== projectName);
      }
    },
  },
});


export const { addOrg, addMembers, removeOrg, addProjectToOrg, removeProjectFromOrg } = orgSlice.actions;

export default orgSlice.reducer;

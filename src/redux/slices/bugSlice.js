import { createSlice } from '@reduxjs/toolkit'



const bugSlice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    addBugs: (state, action) => {
      state.push(action.payload);
      console.log(1)
      console.log(state)
    },
    addMembers: (state, action) => {
      const { bugId, member } = action.payload;
      const index = state.findIndex(obj => obj.id === bugId);
      console.log(state)
      if (index !== -1) {
        if (!state[index].members) {
          state[index].members = []; 
        }
       
        state[index].members.push(...member);
        
      }
    },
    removeBug: (state, action) => {
      
      state.splice(action.payload, 1);
    },
    addBugToProject: (state, action) => {
      const { orgId, projectId } = action.payload;
      const org = state.find(org => org.id === orgId);
      if (org) {
        org.projectIds.push(projectId);
      }
    },
    removeBugFromProject: (state, action) => {
      const { orgId, projectId } = action.payload;
      const org = state.find(org => org.id === orgId);
      if (org) {
        org.projectId = org.projectIds.filter(_id => _id !== projectId);
      }
    },
    removeAllBugsFromProject: (state, action) => {
      const project = state.find(project => project.id === action.payload);
      if (project) {
        project.bugIds = [];
      }
    }
  },
});


export const { addOrg, addMembers, removeOrg, addProjectToOrg, removeProjectFromOrg } = orgSlice.actions;

export default orgSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'



const projectSlice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {
    addProject: (state, action) => {
      state.push(action.payload);
      console.log(1)
      console.log(state)
    },
    addMembers: (state, action) => {
      const { projectId, member } = action.payload;
      const index = state.findIndex(obj => obj.id === projectId);
      console.log(state)
      if (index !== -1) {
        if (!state[index].members) {
          state[index].members = []; 
        }
       
        state[index].members.push(...member);
        
      }
    },
    removeProject: (state, action) => {
      
      state.splice(action.payload, 1);
    },
    addBugsToOrg: (state, action) => {
      const { projectId, bugId } = action.payload;
      const project = state.find( project=> project.id === projectId);
      if (project) {
        project.bugIds.push(bugId);
      }
    },
    removeBugFromOrg: (state, action) => {
      const { projectId, bugId } = action.payload;
      const project = state.find( project=> project.id === projectId);
      if (project) {
        project.bugId = org.bugIds.filter(_id => _id !== bugId);
      }
    },
    removeAllProjectsFromOrg: (state, action) => {
        const project = state.find( project=> project.id === projectId);
      if (project) {
        project.bugIds = [];
      }
    }
  },
});


export const { addOrg, addMembers, removeOrg, addProjectToOrg, removeProjectFromOrg } = orgSlice.actions;

export default orgSlice.reducer;

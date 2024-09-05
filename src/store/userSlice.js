import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  username: null,
  email: null,
  fullName: null,
  jobTitle: null,
  industry: null,
  yearsOfExperience: null,
  educationalBackground: {
    degree: null,
    fieldOfStudy: null
  },
  currentSkills: [],
  careerGoals: {
    shortTerm: null,
    longTerm: null
  },
  country: null,
  image: null,
  createdAt: null,
  updatedAt: null,
  isLoggedIn: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload, isLoggedIn: true };
    },
    clearUser: () => initialState,
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
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
  isLoggedIn: false,
  analysisResult: null
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
    },
    setAnalysisResult: (state, action) => {
      state.analysisResult = action.payload;
    }
  }
});

export const { setUser, clearUser, updateUser, setAnalysisResult } = userSlice.actions;
export default userSlice.reducer;
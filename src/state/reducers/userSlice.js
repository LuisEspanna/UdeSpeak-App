import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    keys: []
  },
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    setPermission: (state, action) => {
      state.permission = action.payload;
    },
    addCoursed : (state, action) => {
      state.coursed = action.payload;
    },
    addKey : (state, action) => {
      state.keys = [...state.keys, action.payload];
    }
  },
})

export const { setUser, setPermission, addCoursed, addKey } = userSlice.actions

export default userSlice.reducer
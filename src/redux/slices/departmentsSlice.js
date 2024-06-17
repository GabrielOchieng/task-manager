import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [], // Array to store department data
};

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
    addDepartment: (state, action) => {
      state.departments.push(action.payload);
    },
    updateDepartment: (state, action) => {
      const departmentIndex = state.departments.findIndex(
        (department) => department.id === action.payload.id
      );
      if (departmentIndex !== -1) {
        state.departments[departmentIndex] = action.payload;
      }
    },
    deleteDepartment: (state, action) => {
      state.departments = state.departments.filter(
        (department) => department.id !== action.payload
      );
    },
  },
});

export const {
  setDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} = departmentsSlice.actions;

export default departmentsSlice.reducer;

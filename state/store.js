import { configureStore } from "@reduxjs/toolkit";
import userRoleReducer from "./userRoleState";

export const store = configureStore({ reducer: { userRole: userRoleReducer } });

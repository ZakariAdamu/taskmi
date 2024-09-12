import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import taskReducer from "./features/tasks/taskSlice";

// Define the root reducer
const rootReducer = {
	auth: authReducer,
	tasks: taskReducer,
	// You can add more reducers here
};

// Create and configure the store
export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools only in development
	// Add any custom middleware here if needed
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Disable serializability check if needed (e.g., for non-serializable values)
		}),
});

export default store;

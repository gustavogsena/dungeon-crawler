import { configureStore } from '@reduxjs/toolkit';
import { userListener } from './middlewares/user.middleware';
import userSlice from './reducers/user.slice';

const store = configureStore({
    reducer: {
        user: userSlice
    },
    middleware:
      getDefaultMiddleware =>
        getDefaultMiddleware().prepend(
          userListener.middleware,
        )
  });
  
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  
  export default store;
  
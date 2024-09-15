  import {configureStore} from "@reduxjs/toolkit"

  import { isRejectedWithValue } from '@reduxjs/toolkit'
  import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
  import  authReducer from "./auth";
  // import {authApi} from "../slices/auth"

  import { apiSlice } from '../slices/apiSlice';
  import { loginStateSlice } from "@/slices/auth/loginStates";




  export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
      if (isRejectedWithValue(action)) {
        console.warn(`We got a rejected action! ${action.error.message}`)
        console.log(action.payload)
        if(action.payload.status == 401 || action.payload.status == 403){
          window.location.replace("http://localhost:3000/login")
        }
      }
      return next(action)
  }

  export const store = configureStore({
      reducer: {
          [apiSlice.reducerPath]: apiSlice.reducer,
          [loginStateSlice.name]: loginStateSlice.reducer,
          auth: authReducer,
    
      },
      middleware: getDefaultMiddleware =>
          getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware,rtkQueryErrorLogger),
      devTools: true
  })

  export type AppDispatch = typeof store.dispatch
  export type RootState = ReturnType<typeof store.getState>;


import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { taskSlice } from "@/features/task/taskSlice"

export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

import { PRIORITIES, STATUSES } from "@/app/constants/tasks"
import { TaskType } from "@/types/task"
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
// import { useDispatch, useSelector } from "react-redux"

// Define the async thunks
export const getTasks = createAsyncThunk<TaskType[], string>(
  "tasks/getTasks",
  async (url, thunkAPI) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
  },
)

export const postTask = createAsyncThunk<TaskType, { url: string; body: any }>(
  "tasks/postTask",
  async ({ url, body }, thunkAPI) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return data
  },
)

export const putTask = createAsyncThunk<TaskType, { url: string; body: any }>(
  "tasks/putTask",
  async ({ url, body }, thunkAPI) => {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return data
  },
)

export const deleteTask = createAsyncThunk<
  boolean,
  { url: string; id: number }
>("tasks/deleteTask", async ({ url, id }, thunkAPI) => {
  const response = await fetch(`${url}/${id}`, { method: "DELETE" })
  return response.ok
})

export const sortTasksByTitle = createAction<"asc" | "desc">("tasks/sortTasks")
export const sortTasksByStatus = createAction<"asc" | "desc">(
  "tasks/sortTasksByStatus",
)
export const sortTasksByPriority = createAction<"asc" | "desc">(
  "tasks/sortTasksByPriority",
)
export const sortTasksByProgress = createAction<"asc" | "desc">(
  "tasks/sortTasksByProgress",
)

// Define the slice
export const taskSlice = createSlice({
  name: "tasks",
  initialState: [] as TaskType[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      console.log(action.payload)
      state.splice(0, state.length, ...action.payload)
    })
    builder.addCase(postTask.fulfilled, (state, action) => {
      state.unshift(action.payload)
    })
    builder.addCase(putTask.fulfilled, (state, action) => {
      const index = state.findIndex((task) => task._id === action.payload._id)
      if (index !== -1) {
        state[index] = action.payload
      }
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      // Remove the deleted task from the state
      return state.filter((task) => task._id !== action.meta.arg.id)
    })
    builder.addCase(sortTasksByTitle, (state, action) => {
      const sortOrder = action.payload
      state.sort((a, b) => {
        const result = a.title.localeCompare(b.title)
        return sortOrder === "asc" ? result : -result
      })
    })
    builder.addCase(sortTasksByStatus, (state, action) => {
      const sortOrder = action.payload
      state.sort((a, b) => {
        const result = STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status)
        return sortOrder === "asc" ? result : -result
      })
    })

    builder.addCase(sortTasksByPriority, (state, action) => {
      const sortOrder = action.payload
      state.sort((a, b) => {
        const result =
          PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority)
        return sortOrder === "asc" ? result : -result
      })
    })

    builder.addCase(sortTasksByProgress, (state, action) => {
      const sortOrder = action.payload
      state.sort((a, b) => {
        const result = a.progress - b.progress
        return sortOrder === "asc" ? result : -result
      })
    })
  },
})

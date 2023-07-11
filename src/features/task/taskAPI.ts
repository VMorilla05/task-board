import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTasks, postTask, putTask, deleteTask } from "./taskSlice"
import { AppDispatch, RootState } from "@/app/store"

function useFetchTasks() {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGetTasks = async (url: string) => {
    setLoading(true)
    try {
      await dispatch(getTasks(url))
      setError(null)
    } catch (err) {
      console.error("getTasks error", err)
      setError(err as Error)
    }
    setLoading(false)
  }

  const handlePostTask = async (url: string, body: any) => {
    setLoading(true)
    try {
      await dispatch(postTask({ url, body }))
      setError(null)
    } catch (err) {
      setError(err as Error)
    }
    setLoading(false)
  }

  const handlePutTask = async (url: string, body: any) => {
    setLoading(true)
    try {
      await dispatch(putTask({ url, body }))
      setError(null)
    } catch (err) {
      console.error("handlePutTask error", err)
      setError(err as Error)
    }
    setLoading(false)
  }

  const handleDeleteTask = async (url: string, id: number) => {
    setLoading(true)
    try {
      await dispatch(deleteTask({ url, id }))
      setError(null)
    } catch (err) {
      setError(err as Error)
    }
    setLoading(false)
  }

  return {
    tasks,
    error,
    loading,
    handleGetTasks,
    handlePostTask,
    handlePutTask,
    handleDeleteTask,
  }
}

export default useFetchTasks

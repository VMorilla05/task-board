import { FC, useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Divider from "@/components/ui/divider"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TaskSort } from "@/types/task"
import Task from "./Task"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SORTBY } from "@/app/constants/tasks"
import useFetchTasks from "./taskAPI"
import { ScrollArea } from "@/components/ui/scroll-area"
import CreateTaskModal from "@/components/createTaskDialog"
import { useAppDispatch } from "@/app/hooks"
import {
  sortTasksByPriority,
  sortTasksByProgress,
  sortTasksByStatus,
  sortTasksByTitle,
} from "./taskSlice"

const TaskBoard: FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [sortBy, setSortBy] = useState<TaskSort>()
  const { tasks, error, loading, handleGetTasks } = useFetchTasks()
  console.log(tasks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    async function fetchTasks() {
      await handleGetTasks("https://sbc-test-api.web.app/tasks")
    }
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSortChange = useCallback(
    (sort: TaskSort) => {
      setSortBy(sort)
      if (sort === TaskSort.TITLE) {
        dispatch(sortTasksByTitle(sortOrder))
        return
      }
      if (sort === TaskSort.PRIORITY) {
        dispatch(sortTasksByPriority(sortOrder))
        return
      }
      if (sort === TaskSort.STATUS) {
        dispatch(sortTasksByStatus(sortOrder))
        return
      }
      if (sort === TaskSort.PROGRESS) {
        dispatch(sortTasksByProgress(sortOrder))
        return
      }
    },
    [dispatch, setSortBy, sortOrder],
  )

  useEffect(() => {
    if (sortBy) {
      handleSortChange(sortBy)
    }
  }, [handleSortChange, sortBy])

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen overflow-auto bg-background py-6 flex flex-col justify-center items-center">
      <div className="text-primary text-4xl font-bold mb-6">Task Board</div>
      <Card className="w-full md:w-1/2">
        <CardHeader className="space-y-1">
          <CardTitle className="flex justify-between text-2xl">
            <span>Todo List</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <Input
              className="w-2/3 lg:w-8/12"
              placeholder="Search tasks"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CreateTaskModal />
          </div>
          <div className="mt-3 flex items-center">
            <span className="text-sm">Sort by</span>
            <div className="inline-block ml-2">
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-fit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  {SORTBY.map((sort) => (
                    <SelectItem key={sort} value={sort}>
                      {sort}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <img
              className="inline ml-2"
              src={
                sortOrder === "asc"
                  ? "src/assets/images/arrow-141-16.ico"
                  : "src/assets/images/arrow-203-16.ico"
              }
              alt=""
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            />
          </div>
          <Divider className="relative mt-12" />
          <ScrollArea className="h-[480px] w-[910px]">
            {filteredTasks.length === 0 ? (
              <div className="mt-[230px] text-center text-lg text-gray-400">
                No tasks found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/5 text-lg">Title</TableHead>
                    <TableHead className="w-1/5 text-center text-lg">
                      Priority
                    </TableHead>
                    <TableHead className="w-1/5 text-center text-lg">
                      Status
                    </TableHead>
                    <TableHead className="w-1/5 text-center text-lg">
                      Progress
                    </TableHead>
                    <TableHead className="w-1/5 text-center text-lg">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task, index) => (
                    <Task key={index} task={task} />
                  ))}
                </TableBody>
              </Table>
            )}
          </ScrollArea>
          <Divider className="relative mb-12" />
        </CardContent>
      </Card>
    </div>
  )
}

export default TaskBoard

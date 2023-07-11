import { TableCell, TableRow } from "@/components/ui/table"
import { TaskPriority, TaskProps } from "@/types/task"
import { useState, useEffect } from "react"
import ProgressBar from "./../../components/ui/radialBar"
import { Badge } from "@/components/ui/badge"
import useFetchTasks from "./taskAPI"
import EditTaskModal from "@/components/editTaskDialog"

export default function Task({ task }: TaskProps) {
  const [priorityColor, setPriorityColor] = useState("")
  const { error, loading, handleDeleteTask, handleGetTasks } = useFetchTasks()

  useEffect(() => {
    if (task.priority === TaskPriority.LOW) {
      setPriorityColor("text-green-400")
      return
    }
    if (task.priority === TaskPriority.MEDIUM) {
      setPriorityColor("text-yellow-400")
      return
    }
    if (task.priority === TaskPriority.HIGH) {
      setPriorityColor("text-red-400")
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.priority])

  const handleRemoveTask = async () => {
    await handleDeleteTask("https://sbc-test-api.web.app/tasks", task._id)

    await handleGetTasks("https://sbc-test-api.web.app/tasks")
  }

  return (
    <TableRow>
      <TableCell>
        <span>{task.title}</span>
      </TableCell>
      <TableCell>
        <div className="flex justify-center">
          <span className={`capitalize ${priorityColor}`}>{task.priority}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex justify-center">
          <Badge variant="outline" className="capitalize">
            {task.status}
          </Badge>
        </div>
      </TableCell>
      <TableCell>
        <ProgressBar progress={task.progress} />
      </TableCell>
      <TableCell>
        <div className="flex justify-around items-center">
          <EditTaskModal task={task} />
          <img
            className="w-6 h-6"
            src="src\assets\images\trash-9-24.ico"
            onClick={handleRemoveTask}
            alt="delete task"
          />
        </div>
      </TableCell>
    </TableRow>
  )
}

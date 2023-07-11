import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FC, FormEvent, useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select"
import { PRIORITIES, STATUSES } from "@/app/constants/tasks"
import { TaskPriority, TaskStatus, TaskType } from "@/types/task"
import useFetchTasks from "@/features/task/taskAPI"

interface Props {
  task: TaskType
}

const EditTaskModal: FC<Props> = (props) => {
  const { task } = props
  const { error, loading, handlePutTask, handleGetTasks } = useFetchTasks()
  const [priorityColor, setPriorityColor] = useState("")
  const [title, setTitle] = useState(task.title)
  const [priority, setPriority] = useState(task.priority)
  const [status, setStatus] = useState(task.status)
  const [progress, setProgress] = useState(task.progress)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (priority === TaskPriority.LOW) {
      setPriorityColor("text-green-500")
      return
    }
    if (priority === TaskPriority.MEDIUM) {
      setPriorityColor("text-yellow-500")
      return
    }
    if (priority === TaskPriority.HIGH) {
      setPriorityColor("text-red-500")
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priority])

  useEffect(() => {
    if (!open) {
      setTitle(task.title)
      setPriority(task.priority)
      setStatus(task.status)
      setProgress(task.progress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleTitleChange = (event: FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const handlePriorityChange = (priority: TaskPriority) => {
    setPriority(priority)
  }

  const handleStatusChange = (status: TaskStatus) => {
    setStatus(status)
  }

  const handleProgressChange = (event: FormEvent<HTMLInputElement>) => {
    setProgress(parseInt(event.currentTarget.value))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await handlePutTask(`https://sbc-test-api.web.app/tasks/${task._id}`, {
      title: title,
      status: status,
      priority: priority,
      progress: progress,
    })

    await handleGetTasks("https://sbc-test-api.web.app/tasks")

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <img
          className="w-6 h-6"
          src="src\assets\images\edit-property-24.ico"
          alt="edit task"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
            <DialogDescription>
              Make changes to your task here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="my-5">
            <div className="">
              <Label htmlFor="title" className="text-center">
                Title
              </Label>
              <Input
                id="title"
                className="mt-2"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="flex justify-evenly mt-4">
              <div className="w-1/3">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select value={priority} onValueChange={handlePriorityChange}>
                  <SelectTrigger className={`w-fit ${priorityColor} mt-2`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {PRIORITIES.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-fit mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Label htmlFor="progress" className="text-right">
                  Progress
                </Label>
                <Input
                  id="progress"
                  type="number"
                  value={progress}
                  onChange={handleProgressChange}
                  className="mt-2 w-[70px]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTaskModal

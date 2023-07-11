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

interface Props {}

const CreateTaskModal: FC<Props> = (props) => {
  const { error, loading, handlePostTask, handleGetTasks } = useFetchTasks()
  const [priorityColor, setPriorityColor] = useState("")
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState(TaskPriority.LOW)
  const [status, setStatus] = useState(TaskStatus.TODO)
  const [progress, setProgress] = useState(0)
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
      setTitle("")
      setPriority(TaskPriority.LOW)
      setStatus(TaskStatus.TODO)
      setProgress(0)
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
    if (parseInt(event.currentTarget.value) > 100) return setProgress(100)
    if (parseInt(event.currentTarget.value) < 0) return setProgress(0)

    setProgress(parseInt(event.currentTarget.value))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title) {
      return alert("Title is required")
    }

    await handlePostTask("https://sbc-test-api.web.app/tasks", {
      title: title,
      status: status,
      priority: priority,
      progress: progress,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-1/4 lg:w-fit ">New task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create task</DialogTitle>
            <DialogDescription>
              Create your task here. Click create when you're done.
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
                  placeholder="0"
                  value={progress}
                  onChange={handleProgressChange}
                  className="mt-2 w-[70px]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskModal

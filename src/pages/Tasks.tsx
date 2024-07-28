import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import TaskItem from "../components/Task-items";
import { fetchTasks, editTask, deleteTask } from "../service/service";

type Task = {
  id: number;
  body: string;
  Priority: number;
  Completed: boolean;
};

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const tasks = await fetchTasks();
    setTasks(tasks);
  };

  // const handleTaskCheck = (taskId: number, Completed: boolean) => {
  //   setTasks((tasks) =>
  //     tasks.map((task) => (task.id === taskId ? { ...task, Completed } : task))
  //   );
  //   getTasks();

  //   // if (navigator.onLine) {
  //   //   getTasks();
  //   // }
  // };

  const handleTaskCheck = async (taskId: number, completed: boolean) => {
    // Optimistically update the task
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, Completed: completed } : task
    );
    setTasks(updatedTasks);

    try {
      await editTask(taskId, completed);
      toast.success("Saved the changes!");
    } catch (err) {
      // Optimistically update the task and when online, the background sync ability of the sw.js will call the API and update the DB
      // setTasks(updatedTasks);

      //If you don't want to optimistically update the UI
      // setTasks(tasks);

      if (!navigator.onLine) {
        return toast.success(
          "You're offline! Changes will be synced when you're online again"
        );
      }
      toast.error("Failed to save changes!");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully!");
    } catch (err) {
      // Revert the change if the deletion fails
      // setTasks(updatedTasks);

      if (!navigator.onLine) {
        return toast.success(
          "You're offline! Changes will be synced when you're online again"
        );
      }
      toast.error("Failed to delete task!");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Layout>
      {/* Tags header */}
      <div className="flex gap-2 mb-4">
        <Link
          to="/"
          className="flex p-2 px-3 text-black bg-green-200 rounded-full"
        >
          Todo
        </Link>
        <button className="flex p-2 px-3 text-white bg-gray-800 rounded-full">
          In progress
        </button>
        <button className="flex p-2 px-3 text-white bg-gray-800 rounded-full">
          Done
        </button>

        <Link
          to="/create"
          className="flex p-2 my-auto ml-auto text-black bg-yellow-200 rounded-full h-fit"
        >
          <IoAdd />
        </Link>
      </div>

      {/* Tasks */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            body={task.body}
            Completed={task.Completed}
            Priority={task.Priority}
            onCheck={(completed) => {
              handleTaskCheck(task.id, completed);
            }}
            onDelete={() => handleDeleteTask(task.id)}
          />
        ))}
      </div>
    </Layout>
  );
}

export default Tasks;

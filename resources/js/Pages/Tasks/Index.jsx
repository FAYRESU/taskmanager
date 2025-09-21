import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function Index() {
  const { tasks, statusFilter, typeFilter, flash } = usePage().props;
  const [newTask, setNewTask] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newType, setNewType] = useState('task'); // Default to 'task'

  useEffect(() => {
    if (flash && flash.success) {
      toast.success(flash.success);
    }
  }, [flash]);

  const createTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    router.post('/tasks', { title: newTask, due_date: newDueDate || null, type: newType });
    setNewTask('');
    setNewDueDate('');
    setNewType('task');
  };

  const updateStatus = (task, status) => {
    router.patch(`/tasks/${task.id}`, { status });
  };

  const updateDueDate = (task, date) => {
    router.patch(`/tasks/${task.id}`, { due_date: date || null });
  };

  const updateType = (task, type) => {
    router.patch(`/tasks/${task.id}`, { type });
  };

  const deleteTask = (task) => {
    if (confirm('Delete this task?')) {
      router.delete(`/tasks/${task.id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Board</h1>

      <form onSubmit={createTask} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="input input-bordered w-full flex-1"
          placeholder="Add a new task..."
        />
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          className="input input-bordered"
        />
        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          className="select select-bordered"
        >
          <option value="task">Task</option>
          <option value="bug">Bug</option>
          <option value="story">Story</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <a href="/?statusFilter=all" className={`btn ${statusFilter === 'all' ? 'btn-active' : ''}`}>All Statuses</a>
        <a href="/?statusFilter=todo" className={`btn ${statusFilter === 'todo' ? 'btn-active' : ''}`}>To Do</a>
        <a href="/?statusFilter=in_progress" className={`btn ${statusFilter === 'in_progress' ? 'btn-active' : ''}`}>In Progress</a>
        <a href="/?statusFilter=done" className={`btn ${statusFilter === 'done' ? 'btn-active' : ''}`}>Done</a>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <a href="/?typeFilter=all" className={`btn ${typeFilter === 'all' ? 'btn-active' : ''}`}>All Types</a>
        <a href="/?typeFilter=task" className={`btn ${typeFilter === 'task' ? 'btn-active' : ''}`}>Task</a>
        <a href="/?typeFilter=bug" className={`btn ${typeFilter === 'bug' ? 'btn-active' : ''}`}>Bug</a>
        <a href="/?typeFilter=story" className={`btn ${typeFilter === 'story' ? 'btn-active' : ''}`}>Story</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['todo', 'in_progress', 'done'].map((statusKey) => (
          <div key={statusKey} className="bg-base-200 p-4 rounded-box shadow-lg">
            <h2 className="text-xl font-semibold mb-4 capitalize">{statusKey.replace('_', ' ')}</h2>
            <div className="space-y-4">
              {tasks.filter(task => task.status === statusKey && (typeFilter === 'all' || task.type === typeFilter)).map((task) => (
                <div key={task.id} className="card bg-base-100 shadow-xl">
                  <div className="card-body p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`card-title text-lg ${task.status === 'done' ? 'line-through text-gray-500' : ''}`}>{task.title}</span>
                      <button onClick={() => deleteTask(task)} className="btn btn-error btn-sm">
                        Delete
                      </button>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Type: <select
                        value={task.type}
                        onChange={(e) => updateType(task, e.target.value)}
                        className="select select-bordered select-sm inline-block"
                      >
                        <option value="task">Task</option>
                        <option value="bug">Bug</option>
                        <option value="story">Story</option>
                      </select>
                    </div>
                    {task.due_date && (
                      <div className="text-sm text-gray-600 mb-2">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <select
                        value={task.status}
                        onChange={(e) => updateStatus(task, e.target.value)}
                        className="select select-bordered select-sm"
                      >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                      <input
                        type="date"
                        value={task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : ''}
                        onChange={(e) => updateDueDate(task, e.target.value)}
                        className="input input-bordered input-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

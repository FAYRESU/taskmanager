import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { Trash2 } from "lucide-react";

export default function Index({ auth }) {
  const { tasks, statusFilter, typeFilter, flash } = usePage().props;
  const [newTask, setNewTask] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newType, setNewType] = useState('task');
  const [isAdding, setIsAdding] = useState(false);

  // Progress
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  useEffect(() => {
    if (flash && flash.success) toast.success(flash.success);
  }, [flash]);

  const createTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setIsAdding(true);
    router.post('/tasks', { title: newTask, due_date: newDueDate || null, type: newType });
    setNewTask('');
    setNewDueDate('');
    setNewType('task');
    setTimeout(() => setIsAdding(false), 300);
  };

  const updateStatus = (task, status) => router.patch(`/tasks/${task.id}`, { status });
  const updateDueDate = (task, date) => router.patch(`/tasks/${task.id}`, { due_date: date || null });
  const updateType = (task, type) => router.patch(`/tasks/${task.id}`, { type });
  const deleteTask = (task) => confirm('Delete this task?') && router.delete(`/tasks/${task.id}`);

  // Bubble background positions
  const bubbles = [
    { top: 10, left: 5, size: 32, color: 'pink' },
    { top: 60, left: 80, size: 48, color: 'yellow' },
    { top: 25, left: 50, size: 40, color: 'green' },
    { top: 80, left: 20, size: 56, color: 'purple' },
  ];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>}
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="relative max-w-6xl mx-auto p-6 rounded-3xl">

                {/* Floating Bubbles */}
                {bubbles.map((b, i) => (
                  <div
                    key={i}
                    className={`absolute rounded-full opacity-20 animate-bounce-slow`}
                    style={{
                      width: `${b.size}px`,
                      height: `${b.size}px`,
                      top: `${b.top}%`,
                      left: `${b.left}%`,
                      backgroundColor: b.color === 'pink' ? '#FBCFE8' :
                                       b.color === 'yellow' ? '#FEF08A' :
                                       b.color === 'green' ? '#BBF7D0' :
                                       '#C4B5FD',
                      zIndex: 0,
                    }}
                  ></div>
                ))}

                <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700 drop-shadow-md">✨ Task Board</h1>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-1 text-sm text-gray-600 font-medium">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Create Task */}
                <form
                  onSubmit={createTask}
                  className="flex flex-col sm:flex-row gap-4 mb-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 relative"
                >
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="📝 Add a new task..."
                    className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm"
                  />
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm"
                  />
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm"
                  >
                    <option value="task">📝 Task</option>
                    <option value="bug">🐞 Bug</option>
                    <option value="story">📖 Story</option>
                  </select>
                  <button
                    type="submit"
                    className={`flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg active:scale-95 transition-all
                      ${isAdding ? 'animate-pulse' : ''}`}
                  >
                    ➕ Add Task
                  </button>
                </form>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  {['all', 'todo', 'in_progress', 'done'].map((status) => (
                    <a
                      key={status}
                      href={`/?statusFilter=${status}`}
                      className={`px-4 py-2 rounded-full shadow-md border ${
                        statusFilter === status
                          ? 'bg-gray-700 text-white border-gray-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
                      }`}
                    >
                      {status === 'all' ? 'All Statuses' :
                       status === 'todo' ? 'To Do' :
                       status === 'in_progress' ? 'In Progress' : 'Done'}
                    </a>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  {['all','task','bug','story'].map(type => (
                    <a
                      key={type}
                      href={`/?typeFilter=${type}`}
                      className={`px-4 py-2 rounded-full shadow-md border ${
                        typeFilter === type ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-300'
                      }`}
                    >
                      {type === 'all' ? 'All Types' : type === 'task' ? 'Task' : type === 'bug' ? 'Bug' : 'Story'}
                    </a>
                  ))}
                </div>

                {/* Task Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {['todo','in_progress','done'].map(statusKey => (
                    <div key={statusKey} className={`p-5 rounded-xl shadow-lg border transition transform hover:scale-105 hover:shadow-2xl
                      ${statusKey==='todo'?'bg-red-50 border-red-300':''}
                      ${statusKey==='in_progress'?'bg-yellow-50 border-yellow-300':''}
                      ${statusKey==='done'?'bg-green-50 border-green-300':''}`}>

                      <h2 className={`text-2xl font-bold mb-4 capitalize border-b pb-2
                        ${statusKey==='todo'?'text-red-700 border-red-300':''}
                        ${statusKey==='in_progress'?'text-yellow-700 border-yellow-300':''}
                        ${statusKey==='done'?'text-green-700 border-green-300':''}`}>
                        {statusKey.replace('_',' ')}
                      </h2>

                      <div className="space-y-4">
                        {tasks.filter(task => task.status===statusKey && (typeFilter==='all' || task.type===typeFilter))
                          .map(task => (
                            <div key={task.id} className={`p-4 rounded-lg shadow-md border transition transform hover:scale-105 hover:shadow-xl
                              ${task.type==='task'?'bg-white border-blue-300':''}
                              ${task.type==='bug'?'bg-red-50 border-red-400':''}
                              ${task.type==='story'?'bg-purple-50 border-purple-400':''}`}>

                              <div className="flex justify-between items-center mb-2">
                                <span className={`text-lg font-semibold ${task.status==='done'?'line-through text-gray-500':'text-gray-800'}`}>
                                  {task.title}
                                </span>

                                <button
                                  onClick={() => deleteTask(task)}
                                  className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 shadow-sm transition"
                                  title="Delete Task"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>

                              <div className="text-sm mb-2">
                                Type:{' '}
                                <select value={task.type} onChange={(e)=>updateType(task,e.target.value)}
                                  className="ml-2 px-2 py-1 text-sm rounded-md border focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                                >
                                  <option value="task">📝 Task</option>
                                  <option value="bug">🐞 Bug</option>
                                  <option value="story">📖 Story</option>
                                </select>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <select value={task.status} onChange={(e)=>updateStatus(task,e.target.value)}
                                  className="px-2 py-1 text-sm rounded-md border focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                                >
                                  <option value="todo">🛑 To Do</option>
                                  <option value="in_progress">⚡ In Progress</option>
                                  <option value="done">✅ Done</option>
                                </select>

                                <input
                                  type="date"
                                  value={task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : ''}
                                  onChange={(e)=>updateDueDate(task,e.target.value)}
                                  className={`px-2 py-1 text-sm rounded-md border focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                                    ${task.type==='task'?'bg-blue-50 border-blue-300':''}
                                    ${task.type==='bug'?'bg-red-50 border-red-400':''}
                                    ${task.type==='story'?'bg-purple-50 border-purple-400':''}
                                    w-full`}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Extra animation styles */}
                <style>{`
                  @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                  }
                  .animate-bounce-slow {
                    animation: bounce-slow 6s infinite ease-in-out;
                  }
                `}</style>

              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

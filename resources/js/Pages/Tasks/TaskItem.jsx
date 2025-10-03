import React from 'react';
import { router } from '@inertiajs/react';
import { Trash2, Bug, BookOpen, CheckSquare } from 'lucide-react';

export default function TaskItem({ task }) {
    const updateStatus = (newStatus) => {
        router.patch(`/tasks/${task.id}`, { status: newStatus }, { preserveScroll: true });
    };

    const updateType = (newType) => {
        router.patch(`/tasks/${task.id}`, { type: newType }, { preserveScroll: true });
    };

    const updateDueDate = (newDate) => {
        router.patch(`/tasks/${task.id}`, { due_date: newDate || null }, { preserveScroll: true });
    };

    const deleteTask = () => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(`/tasks/${task.id}`, { preserveScroll: true });
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'bug': return <Bug size={16} className="text-red-500" />;
            case 'story': return <BookOpen size={16} className="text-purple-500" />;
            case 'task':
            default:
                return <CheckSquare size={16} className="text-blue-500" />;
        }
    };

    const typeBgClasses = {
        task: 'bg-blue-50 border-blue-200',
        bug: 'bg-red-50 border-red-200',
        story: 'bg-purple-50 border-purple-200',
    };

    return (
        <div className={`p-4 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md hover:border-indigo-300 ${typeBgClasses[task.type]}`}>
            <div className="flex justify-between items-start">
                <span className={`font-semibold text-gray-800 ${task.status === 'done' ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                </span>
                <button
                    onClick={deleteTask}
                    className="p-1.5 rounded-md text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                    title="Delete Task"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="mt-3 space-y-3">
                {/* Type and Due Date */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        {getTypeIcon(task.type)}
                        <select
                            value={task.type}
                            onChange={(e) => updateType(e.target.value)}
                            className="bg-transparent p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400"
                        >
                            <option value="task">Task</option>
                            <option value="bug">Bug</option>
                            <option value="story">Story</option>
                        </select>
                    </div>
                    <input
                        type="date"
                        value={task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : ''}
                        onChange={(e) => updateDueDate(e.target.value)}
                        className="p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    />
                </div>

                {/* Status Changer */}
                <div>
                    <select
                        value={task.status}
                        onChange={(e) => updateStatus(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    >
                        <option value="todo">🛑 To Do</option>
                        <option value="in_progress">⚡ In Progress</option>
                        <option value="done">✅ Done</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
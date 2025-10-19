import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import TaskFilter from './TaskFilter';
import TaskItem from './TaskItem';
import { PlusCircle } from 'lucide-react';

export default function Index({ auth }) {
    const { tasks: initialTasks, flash } = usePage().props;
    const [tasks, setTasks] = useState(initialTasks || []);

    // Filter states
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // New task form
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskType, setNewTaskType] = useState('task');
    const [newTaskDueDate, setNewTaskDueDate] = useState('');

    // Update tasks if initialTasks change
    useEffect(() => {
        setTasks(initialTasks || []);
    }, [initialTasks]);

    // Flash message safe handling
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    // Add Task via Inertia POST
    const handleCreateTask = (e) => {
        e.preventDefault();
        if (!newTaskName.trim()) return;

        router.post('/tasks', {
            title: newTaskName, // must match backend field
            type: newTaskType,
        }, {
            onSuccess: () => {
                setNewTaskName(''); 
                setNewTaskType('task'); 
            },
            onError: (errors) => {
                toast.error("Error creating task.");
                console.log(errors);
            }
        });
    };

    // Filtered tasks
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
            const matchesType = typeFilter === 'all' || task.type === typeFilter;
            const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesType && matchesSearch;
        });
    }, [tasks, statusFilter, typeFilter, searchTerm]);

    // Progress calculation
    const doneTasksCount = filteredTasks.filter(task => task.status === 'done').length;
    const totalTasksCount = filteredTasks.length;
    const progressPercent = totalTasksCount > 0 ? Math.round((doneTasksCount / totalTasksCount) * 100) : 0;

    // Dynamic progress bar color
    let progressColor = 'bg-green-500';
    if (progressPercent < 50) progressColor = 'bg-red-500';
    else if (progressPercent < 80) progressColor = 'bg-yellow-400';
    else progressColor = 'bg-green-500';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Task Board</h2>}
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">

                       <form onSubmit={handleCreateTask} className="flex flex-col sm:flex-row gap-3 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
    {/* Task Name */}
    <input
        type="text"
        placeholder="New Task Name"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        className="p-2 rounded border dark:bg-gray-700 dark:text-white dark:border-gray-600 flex-1"
    />

    {/* Task Type */}
    <select
        value={newTaskType}
        onChange={(e) => setNewTaskType(e.target.value)}
        className="p-2 rounded border dark:bg-gray-700 dark:text-white dark:border-gray-600"
    >
        <option value="task">Task</option>
        <option value="bug">Bug</option>
        <option value="story">Story</option>
    </select>

    {/* Due Date */}
    <input
        type="date"
        value={newTaskDueDate}
        onChange={(e) => setNewTaskDueDate(e.target.value)}
        className="p-2 rounded border dark:bg-gray-700 dark:text-white dark:border-gray-600"
    />

    {/* Submit */}
    <button type="submit" className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        <PlusCircle /> Add Task
    </button>
</form>


                        {/* Task Filters */}
                        <TaskFilter
                            statusFilter={statusFilter}
                            onStatusChange={setStatusFilter}
                            typeFilter={typeFilter}
                            onTypeChange={setTypeFilter}
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                        />

                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{progressPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div
                                    className={`${progressColor} h-3 rounded-full transition-all duration-500 ease-out`}
                                    style={{ width: `${progressPercent}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Task List */}
                        <div className="space-y-4">
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map(task => <TaskItem key={task.id} task={task} />)
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">No tasks found.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

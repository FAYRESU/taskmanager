import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import TaskFilter from './TaskFilter';
import TaskItem from './TaskItem';
import { PlusCircle } from 'lucide-react';

export default function Index({ auth }) {
    const { tasks: initialTasks, flash } = usePage().props;
    const [tasks, setTasks] = useState(initialTasks);

    // ... (rest of the state declarations)

    useEffect(() => {
        setTasks(initialTasks);
    }, [initialTasks]);

    // ... (useEffect for flash messages)

    // ... (handleCreateTask function)

    const filteredTasks = useMemo(() => {
        // ... (filtering logic)
    }, [tasks, statusFilter, typeFilter, searchTerm]);

    const tasksByStatus = {
        // ... (tasks by status logic)
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Task Board</h2>}
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">

                        {/* Add Task Form */}
                        <form onSubmit={handleCreateTask} className="flex flex-col sm:flex-row gap-3 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                            {/* ... (form inputs) */}
                        </form>

                        {/* ... (rest of the component) */}
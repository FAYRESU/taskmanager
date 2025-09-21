import React from 'react';
import { useForm } from '@inertiajs/react';

export default function TaskItem({ task }) {
    const { data, setData, put, delete: destroy } = useForm({
        title: task.title,
        completed: task.completed,
    });

    function handleCheckboxChange(e) {
        const newCompletedStatus = e.target.checked;
        setData('completed', newCompletedStatus);
        put(`/tasks/${task.id}`, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function handleDelete() {
        destroy(`/tasks/${task.id}`, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <div className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={data.completed}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                />
                <span className={data.completed ? 'line-through text-gray-500' : ''}>
                    {task.title}
                </span>
            </div>
            <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700"
            >
                Delete
            </button>
        </div>
    );
}

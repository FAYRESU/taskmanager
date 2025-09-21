import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function AddTaskForm() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/tasks', {
            onSuccess: () => setData('title', ''),
        });
    }

    return (
        <form onSubmit={submit} className="mb-4">
            <div className="flex">
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm flex-grow"
                    placeholder="Add a new task"
                />
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md"
                    disabled={processing}
                >
                    Add Task
                </button>
            </div>
            {errors.title && <div className="text-red-500 mt-1">{errors.title}</div>}
        </form>
    );
}

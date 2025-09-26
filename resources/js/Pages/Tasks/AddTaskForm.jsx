import React from 'react';
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
        <form onSubmit={submit} className="mb-6">
            <div className="flex">
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="flex-grow rounded-md shadow-sm 
                               border border-gray-300 
                               bg-white text-gray-900
                               placeholder-gray-400
                               focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Add a new task..."
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="ml-2 px-4 py-2 rounded-md 
                               bg-indigo-600 hover:bg-indigo-700 
                               text-white font-medium
                               disabled:opacity-50"
                >
                    Add Task
                </button>
            </div>
            {errors.title && (
                <div className="text-red-500 mt-2 text-sm">
                    {errors.title}
                </div>
            )}
        </form>
    );
}

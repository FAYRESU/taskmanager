import React from 'react';
import { Link } from '@inertiajs/react';

export default function TaskFilter({ filter }) {
    const filters = [
        { label: 'All', value: 'all' },
        { label: 'Completed', value: 'completed' },
        { label: 'Pending', value: 'pending' },
    ];

    return (
        <div className="flex space-x-2 mb-4">
            {filters.map(f => (
                <Link
                    key={f.value}
                    href={`/tasks?filter=${f.value}`}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        filter === f.value
                            ? 'bg-indigo-600 text-white shadow'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {f.label}
                </Link>
            ))}
        </div>
    );
}

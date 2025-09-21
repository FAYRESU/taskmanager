import React from 'react';
import { Link } from '@inertiajs/react';

export default function TaskFilter({ filter }) {
    const filters = [
        { label: 'All', value: 'all' },
        { label: 'Completed', value: 'completed' },
        { label: 'Pending', value: 'pending' },
    ];

    return (
        <div className="flex space-x-2">
            {filters.map(f => (
                <Link
                    key={f.value}
                    href={`/tasks?filter=${f.value}`}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                        filter === f.value
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    {f.label}
                </Link>
            ))}
        </div>
    );
}

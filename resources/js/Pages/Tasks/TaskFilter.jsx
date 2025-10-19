import React from 'react';
import { Search, ListFilter, Tag } from 'lucide-react';

export default function TaskFilter({
    statusFilter,
    typeFilter,
    onStatusChange,
    onTypeChange,
    searchTerm,
    onSearchChange,
}) {
    const statusOptions = ['all', 'todo', 'in_progress', 'done'];
    const typeOptions = ['all', 'task', 'bug', 'story'];

    const getStatusDisplayName = (status) => {
        switch (status) {
            case 'all': return 'All Statuses';
            case 'todo': return 'To Do';
            case 'in_progress': return 'In Progress';
            case 'done': return 'Done';
            default: return '';
        }
    };

    const getTypeDisplayName = (type) => {
        switch (type) {
            case 'all': return 'All Types';
            case 'task': return 'Task';
            case 'bug': return 'Bug';
            case 'story': return 'Story';
            default: return '';
        }
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Status Filter */}
                <div className="relative">
                    <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {statusOptions.map(status => (
                            <option key={status} value={status}>
                                {getStatusDisplayName(status)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Type Filter */}
                <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select
                        value={typeFilter}
                        onChange={(e) => onTypeChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {typeOptions.map(type => (
                            <option key={type} value={type}>
                                {getTypeDisplayName(type)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

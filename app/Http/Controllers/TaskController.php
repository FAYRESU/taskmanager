<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::query()
            ->when($request->input('statusFilter'), function ($query, $statusFilter) {
                if (in_array($statusFilter, ['todo', 'in_progress', 'done'])) {
                    $query->where('status', $statusFilter);
                }
            })
            ->when($request->input('typeFilter'), function ($query, $typeFilter) {
                if (in_array($typeFilter, ['task', 'bug', 'story'])) {
                    $query->where('type', $typeFilter);
                }
            })
            ->latest()
            ->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'statusFilter' => $request->input('statusFilter', 'all'),
            'typeFilter' => $request->input('typeFilter', 'all'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'nullable|date',
            'type' => 'sometimes|string|in:task,bug,story',
        ]);

        Task::create($request->only('title', 'due_date', 'type'));

        return redirect()->back()->with('success', 'Task created successfully.');
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'status' => 'sometimes|string|in:todo,in_progress,done',
            'due_date' => 'nullable|date',
            'type' => 'sometimes|string|in:task,bug,story',
        ]);

        $task->update($request->only('title', 'status', 'due_date', 'type'));

        return redirect()->back()->with('success', 'Task updated successfully.');
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->back()->with('success', 'Task deleted successfully.');
    }
}

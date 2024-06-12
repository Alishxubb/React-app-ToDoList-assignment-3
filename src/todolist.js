import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [priority, setPriority] = useState('medium');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, completed: false, priority }]);
            setNewTask('');
        }
    };

    const handleCompleteTask = (index) => {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleClearCompleted = () => {
        const filteredTasks = tasks.filter((task) => !task.completed);
        setTasks(filteredTasks);
    };

    const handleEditTask = (index, newText) => {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, text: newText };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <div className="todo-container">
            <h2 className="additional-header">Welcome to our Task Manager</h2>
            <h1>To-Do List</h1>
            <div className="add-task-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                    className="input-field"
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)} className="priority-select">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button onClick={handleAddTask} className="add-button">Add Task</button>
            </div>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleCompleteTask(index)}
                            className="checkbox"
                        />
                        <span
                            className="task-text"
                            contentEditable
                            onBlur={(e) => handleEditTask(index, e.target.textContent)}
                        >
                            {task.text}
                        </span>
                        <button onClick={() => handleDeleteTask(index)} className="delete-button">Delete</button>
                        <span className={`priority-indicator ${task.priority}`}>{task.priority.toUpperCase()}</span>
                    </li>
                ))}
            </ul>
            <button onClick={handleClearCompleted} className="clear-button">Clear Completed</button>
        </div>
    );
};

export default TodoList;

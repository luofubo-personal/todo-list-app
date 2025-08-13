"use strict";
// Todo List Application
// Array to store todo items
let todos = [];
// DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
// Load todos from localStorage when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    renderTodos();
});
// Add todo form submission
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});
// Function to add a new todo
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        // Create todo object
        const todo = {
            id: generateId(),
            text: todoText,
            completed: false,
            timestamp: new Date()
        };
        // Add to todos array
        todos.push(todo);
        // Save to localStorage
        saveTodos();
        // Render todos
        renderTodos();
        // Clear input
        todoInput.value = '';
        todoInput.focus();
    }
}
// Function to toggle todo completion
function toggleComplete(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}
// Function to delete a todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}
// Function to render todos to the DOM
function renderTodos() {
    // Clear the todo list
    todoList.innerHTML = '';
    // Render each todo
    todos.forEach(todo => {
        const todoElement = document.createElement('li');
        todoElement.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoElement.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleComplete(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(todoElement);
    });
    // Update todo count
    const incompleteTodos = todos.filter(todo => !todo.completed).length;
    const todoCountElement = document.getElementById('todo-count');
    if (todoCountElement) {
        todoCountElement.textContent = incompleteTodos.toString();
    }
}
// Function to generate unique ID
function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}
// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
// Function to load todos from localStorage
function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        try {
            todos = JSON.parse(storedTodos);
        }
        catch (e) {
            console.error('Error loading todos from localStorage:', e);
            todos = [];
        }
    }
}

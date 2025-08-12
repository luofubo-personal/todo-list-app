// Todo List Application

// Define the Todo interface
interface Todo {
    id: string;
    text: string;
    completed: boolean;
    timestamp: Date;
}

// Array to store todo items
let todos: Todo[] = [];

// DOM elements
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;

// Load todos from localStorage when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    renderTodos();
});

// Add todo form submission
todoForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    addTodo();
});

// Function to add a new todo
function addTodo(): void {
    const todoText = todoInput.value.trim();
    
    if (todoText) {
        // Create todo object
        const todo: Todo = {
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
function toggleComplete(id: string): void {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

// Function to delete a todo
function deleteTodo(id: string): void {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Function to render todos to the DOM
function renderTodos(): void {
    // Clear the todo list
    todoList.innerHTML = '';
    
    // Render each todo
    todos.forEach(todo => {
        const todoElement = document.createElement('li');
        todoElement.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoElement.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleComplete('${todo.id}')">
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo('${todo.id}')">Delete</button>
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
function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Function to save todos to localStorage
function saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to load todos from localStorage
function loadTodos(): void {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        try {
            todos = JSON.parse(storedTodos);
        } catch (e) {
            console.error('Error loading todos from localStorage:', e);
            todos = [];
        }
    }
}
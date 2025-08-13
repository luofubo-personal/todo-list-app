import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, TodoItemComponent]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoText = '';

  private todoService = inject(TodoService);

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  get incompleteTodosCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  addTodo(): void {
    if (this.newTodoText.trim()) {
      const newTodo: Todo = {
        id: 0,
        text: this.newTodoText,
        completed: false,
        timestamp: new Date()
      };

      this.todoService.addTodo(newTodo)
        .subscribe(todo => {
          this.todos.push(todo);
          this.newTodoText = '';
        });
    }
  }

  toggleComplete(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo)
      .subscribe();
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo.id)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== todo.id);
      });
  }
}
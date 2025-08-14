import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  newTodoText = '';
  newTodoDeadline = '';

  private todoService = inject(TodoService);
  private countdownInterval?: number;

  ngOnInit(): void {
    this.getTodos();
    this.startCountdownTimer();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => {
        // Ensure all todos have the required properties for deadline functionality
        this.todos = todos.map(todo => ({
          ...todo,
          deadline: todo.deadline || undefined,
          timeRemaining: todo.timeRemaining || undefined,
          isOverdue: todo.isOverdue || false,
          priority: todo.priority || 5
        }));
        this.updateCountdowns();
      });
  }

  private startCountdownTimer(): void {
    // Update countdowns every minute
    this.countdownInterval = window.setInterval(() => {
      this.updateCountdowns();
    }, 60000);
  }

  private updateCountdowns(): void {
    this.todos.forEach(todo => {
      // Ensure todo has deadline property and it's not null/undefined
      if (todo.deadline && !todo.completed) {
        try {
          const deadline = new Date(todo.deadline);
          const now = new Date();

          // Check if deadline is a valid date
          if (isNaN(deadline.getTime())) {
            todo.timeRemaining = undefined;
            todo.isOverdue = false;
            return;
          }

          const timeDiff = deadline.getTime() - now.getTime();

          if (timeDiff > 0) {
            todo.timeRemaining = this.formatTimeRemaining(timeDiff);
            todo.isOverdue = false;
          } else {
            todo.timeRemaining = 'Overdue';
            todo.isOverdue = true;
          }
        } catch (error) {
          console.warn('Error processing deadline for todo:', todo.id, error);
          todo.timeRemaining = undefined;
          todo.isOverdue = false;
        }
      } else {
        todo.timeRemaining = undefined;
        todo.isOverdue = false;
      }
    });
  }

  private formatTimeRemaining(milliseconds: number): string {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
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
        timestamp: new Date(),
        deadline: this.newTodoDeadline ? new Date(this.newTodoDeadline) : undefined,
        timeRemaining: undefined,
        isOverdue: false,
        priority: 5
      };

      this.todoService.addTodo(newTodo)
        .subscribe(todo => {
          // Ensure the returned todo has all required properties
          const completeTodo = {
            ...todo,
            deadline: todo.deadline || undefined,
            timeRemaining: todo.timeRemaining || undefined,
            isOverdue: todo.isOverdue || false,
            priority: todo.priority || 5
          };

          this.todos.push(completeTodo);
          this.newTodoText = '';
          this.newTodoDeadline = '';
          this.updateCountdowns();
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
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../todo';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggleTodo = new EventEmitter<Todo>();
  @Output() deleteTodo = new EventEmitter<Todo>();

  onToggle(): void {
    this.toggleTodo.emit(this.todo);
  }

  onDelete(): void {
    this.deleteTodo.emit(this.todo);
  }

  formatDeadline(deadline: Date): string {
    const date = new Date(deadline);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const deadlineDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const daysDiff = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (daysDiff === 0) {
      return `Today at ${timeString}`;
    } else if (daysDiff === 1) {
      return `Tomorrow at ${timeString}`;
    } else if (daysDiff === -1) {
      return `Yesterday at ${timeString}`;
    } else if (daysDiff > 1 && daysDiff <= 7) {
      return `${date.toLocaleDateString([], { weekday: 'long' })} at ${timeString}`;
    } else {
      return `${date.toLocaleDateString()} at ${timeString}`;
    }
  }

  isUrgent(): boolean {
    if (!this.todo.deadline || this.todo.completed) {
      return false;
    }

    const deadline = new Date(this.todo.deadline);
    const now = new Date();
    const timeDiff = deadline.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    // Consider urgent if less than 24 hours remaining
    return hoursDiff < 24 && hoursDiff > 0;
  }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css'],
    standalone: false
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<Todo>();
  @Output() deleteTodo = new EventEmitter<Todo>();

  onToggle(): void {
    this.toggle.emit(this.todo);
  }

  onDelete(): void {
    this.deleteTodo.emit(this.todo);
  }
}
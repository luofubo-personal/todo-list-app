import {
  CommonModule,
  init_common
} from "./chunk-RUZ3W66U.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-4IKF6JLI.js";

// angular:jit:template:src/app/todo-item/todo-item.component.html
var todo_item_component_default;
var init_todo_item_component = __esm({
  "angular:jit:template:src/app/todo-item/todo-item.component.html"() {
    todo_item_component_default = '<li class="todo-item" [class.completed]="todo.completed" [class.overdue]="todo.isOverdue" [class.urgent]="isUrgent()">\n  <input type="checkbox" class="todo-checkbox" [checked]="todo.completed" (change)="onToggle()">\n\n  <div class="todo-content">\n    <span class="todo-text">{{ todo.text }}</span>\n\n    <div class="todo-meta" *ngIf="todo.deadline">\n      <div class="deadline-info">\n        <span class="deadline-icon">\u23F0</span>\n        <span class="deadline-text">{{ formatDeadline(todo.deadline) }}</span>\n      </div>\n\n      <div class="countdown" *ngIf="todo.timeRemaining && !todo.completed"\n           [class.overdue]="todo.isOverdue"\n           [class.urgent]="isUrgent()">\n        <span class="countdown-text">{{ todo.timeRemaining }}</span>\n      </div>\n    </div>\n  </div>\n\n  <button class="delete-btn" (click)="onDelete()">Delete</button>\n</li>';
  }
});

// angular:jit:style:src/app/todo-item/todo-item.component.css
var todo_item_component_default2;
var init_todo_item_component2 = __esm({
  "angular:jit:style:src/app/todo-item/todo-item.component.css"() {
    todo_item_component_default2 = "/* src/app/todo-item/todo-item.component.css */\n.todo-item {\n  display: flex;\n  align-items: flex-start;\n  padding: 15px;\n  border-bottom: 1px solid #f0f0f0;\n  background-color: #fef7f7;\n  border-left: 4px solid #f44336;\n  transition: all 0.2s ease;\n  border-radius: 0 5px 5px 0;\n}\n.todo-item:last-child {\n  border-bottom: none;\n}\n.todo-item:hover {\n  background-color: #fef0f0;\n}\n.todo-item.urgent {\n  background-color: #fff3e0;\n  border-left: 4px solid #ff9800;\n}\n.todo-item.overdue {\n  background-color: #ffebee;\n  border-left: 4px solid #f44336;\n  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.2);\n}\n.todo-item.completed {\n  background-color: #f7fef7;\n  border-left: 4px solid #4caf50;\n}\n.todo-item.completed:hover {\n  background-color: #f0fef0;\n}\n.todo-item.completed .todo-text {\n  text-decoration: line-through;\n  color: #999;\n}\n.todo-checkbox {\n  margin-right: 15px;\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n  margin-top: 2px;\n}\n.todo-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.todo-text {\n  font-size: 1.1rem;\n  line-height: 1.4;\n}\n.todo-meta {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.deadline-info {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.85rem;\n  color: #666;\n}\n.deadline-icon {\n  font-size: 0.9rem;\n}\n.deadline-text {\n  font-weight: 500;\n}\n.countdown {\n  display: inline-flex;\n  align-items: center;\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background-color: #e3f2fd;\n  color: #1976d2;\n  border: 1px solid #bbdefb;\n}\n.countdown.urgent {\n  background-color: #fff3e0;\n  color: #f57c00;\n  border-color: #ffcc02;\n}\n.countdown.overdue {\n  background-color: #ffebee;\n  color: #d32f2f;\n  border-color: #ffcdd2;\n  animation: pulse 2s infinite;\n}\n@keyframes pulse {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.7;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.countdown-text {\n  font-size: 0.75rem;\n}\n.delete-btn {\n  background-color: #e74c3c;\n  color: white;\n  border: none;\n  border-radius: 3px;\n  padding: 5px 10px;\n  cursor: pointer;\n  font-size: 0.8rem;\n  transition: background-color 0.3s;\n}\n.delete-btn:hover {\n  background-color: #c0392b;\n}\n/*# sourceMappingURL=todo-item.component.css.map */\n";
  }
});

// src/app/todo-item/todo-item.component.ts
var _a, TodoItemComponent;
var init_todo_item_component3 = __esm({
  "src/app/todo-item/todo-item.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_todo_item_component();
    init_todo_item_component2();
    init_core();
    init_common();
    TodoItemComponent = (_a = class {
      constructor() {
        this.toggleTodo = new EventEmitter();
        this.deleteTodo = new EventEmitter();
        this._isUrgent = false;
      }
      ngOnChanges(changes) {
        if (changes["todo"]) {
          this._isUrgent = this.calculateUrgency();
        }
      }
      onToggle() {
        this.toggleTodo.emit(this.todo);
      }
      onDelete() {
        this.deleteTodo.emit(this.todo);
      }
      formatDeadline(deadline) {
        const date = new Date(deadline);
        const now = /* @__PURE__ */ new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const deadlineDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const daysDiff = Math.floor((deadlineDate.getTime() - today.getTime()) / (1e3 * 60 * 60 * 24));
        const timeString = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        if (daysDiff === 0) {
          return `Today at ${timeString}`;
        } else if (daysDiff === 1) {
          return `Tomorrow at ${timeString}`;
        } else if (daysDiff === -1) {
          return `Yesterday at ${timeString}`;
        } else if (daysDiff > 1 && daysDiff <= 7) {
          return `${date.toLocaleDateString([], { weekday: "long" })} at ${timeString}`;
        } else {
          return `${date.toLocaleDateString()} at ${timeString}`;
        }
      }
      isUrgent() {
        return this._isUrgent;
      }
      calculateUrgency() {
        if (!this.todo.deadline || this.todo.completed) {
          return false;
        }
        const deadline = new Date(this.todo.deadline);
        const now = /* @__PURE__ */ new Date();
        const timeDiff = deadline.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1e3 * 60 * 60);
        return hoursDiff < 24 && hoursDiff > 0;
      }
    }, _a.propDecorators = {
      todo: [{ type: Input }],
      toggleTodo: [{ type: Output }],
      deleteTodo: [{ type: Output }]
    }, _a);
    TodoItemComponent = __decorate([
      Component({
        selector: "app-todo-item",
        template: todo_item_component_default,
        standalone: true,
        imports: [CommonModule],
        styles: [todo_item_component_default2]
      })
    ], TodoItemComponent);
  }
});

export {
  TodoItemComponent,
  init_todo_item_component3 as init_todo_item_component
};
//# sourceMappingURL=chunk-SPOYICOA.js.map

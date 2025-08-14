import {
  TodoItemComponent,
  init_todo_item_component
} from "./chunk-SPOYICOA.js";
import "./chunk-RUZ3W66U.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-4IKF6JLI.js";

// src/app/todo-item/todo-item.component.spec.ts
var require_todo_item_component_spec = __commonJS({
  "src/app/todo-item/todo-item.component.spec.ts"(exports) {
    init_testing();
    init_todo_item_component();
    describe("TodoItemComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [TodoItemComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(TodoItemComponent);
        component = fixture.componentInstance;
      }));
      it("should create", () => {
        component.todo = {
          id: 1,
          text: "Test Todo",
          completed: false,
          timestamp: /* @__PURE__ */ new Date()
        };
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });
      it("should emit toggleTodo event when checkbox is clicked", () => {
        const todo = {
          id: 1,
          text: "Test Todo",
          completed: false,
          timestamp: /* @__PURE__ */ new Date()
        };
        component.todo = todo;
        spyOn(component.toggleTodo, "emit");
        component.onToggle();
        expect(component.toggleTodo.emit).toHaveBeenCalledWith(todo);
      });
      it("should emit deleteTodo event when delete button is clicked", () => {
        const todo = {
          id: 1,
          text: "Test Todo",
          completed: false,
          timestamp: /* @__PURE__ */ new Date()
        };
        component.todo = todo;
        spyOn(component.deleteTodo, "emit");
        component.onDelete();
        expect(component.deleteTodo.emit).toHaveBeenCalledWith(todo);
      });
      describe("Deadline formatting", () => {
        it("should format today deadline correctly", () => {
          const today = /* @__PURE__ */ new Date();
          today.setHours(14, 30, 0, 0);
          const result = component.formatDeadline(today);
          expect(result).toBe("Today at 14:30");
        });
        it("should format tomorrow deadline correctly", () => {
          const tomorrow = /* @__PURE__ */ new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(9, 15, 0, 0);
          const result = component.formatDeadline(tomorrow);
          expect(result).toBe("Tomorrow at 09:15");
        });
        it("should format yesterday deadline correctly", () => {
          const yesterday = /* @__PURE__ */ new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          yesterday.setHours(16, 45, 0, 0);
          const result = component.formatDeadline(yesterday);
          expect(result).toBe("Yesterday at 16:45");
        });
        it("should format this week deadline correctly", () => {
          const thisWeek = /* @__PURE__ */ new Date();
          thisWeek.setDate(thisWeek.getDate() + 3);
          thisWeek.setHours(11, 0, 0, 0);
          const result = component.formatDeadline(thisWeek);
          const expectedDay = thisWeek.toLocaleDateString([], { weekday: "long" });
          expect(result).toBe(`${expectedDay} at 11:00`);
        });
        it("should format distant deadline correctly", () => {
          const distant = /* @__PURE__ */ new Date();
          distant.setDate(distant.getDate() + 10);
          distant.setHours(13, 20, 0, 0);
          const result = component.formatDeadline(distant);
          const expectedDate = distant.toLocaleDateString();
          expect(result).toBe(`${expectedDate} at 13:20`);
        });
      });
      describe("Urgency detection", () => {
        it("should detect urgent todo (less than 24 hours)", () => {
          const urgentDeadline = /* @__PURE__ */ new Date();
          urgentDeadline.setHours(urgentDeadline.getHours() + 12);
          component.todo = {
            id: 1,
            text: "Urgent Todo",
            completed: false,
            timestamp: /* @__PURE__ */ new Date(),
            deadline: urgentDeadline
          };
          component.ngOnChanges({
            todo: {
              currentValue: component.todo,
              previousValue: null,
              firstChange: true,
              isFirstChange: () => true
            }
          });
          expect(component.isUrgent()).toBe(true);
        });
        it("should not detect urgent todo (more than 24 hours)", () => {
          const futureDeadline = /* @__PURE__ */ new Date();
          futureDeadline.setDate(futureDeadline.getDate() + 2);
          component.todo = {
            id: 1,
            text: "Future Todo",
            completed: false,
            timestamp: /* @__PURE__ */ new Date(),
            deadline: futureDeadline
          };
          expect(component.isUrgent()).toBe(false);
        });
        it("should not detect urgent for overdue todo", () => {
          const overdueDeadline = /* @__PURE__ */ new Date();
          overdueDeadline.setHours(overdueDeadline.getHours() - 2);
          component.todo = {
            id: 1,
            text: "Overdue Todo",
            completed: false,
            timestamp: /* @__PURE__ */ new Date(),
            deadline: overdueDeadline
          };
          expect(component.isUrgent()).toBe(false);
        });
        it("should not detect urgent for completed todo", () => {
          const urgentDeadline = /* @__PURE__ */ new Date();
          urgentDeadline.setHours(urgentDeadline.getHours() + 12);
          component.todo = {
            id: 1,
            text: "Completed Todo",
            completed: true,
            timestamp: /* @__PURE__ */ new Date(),
            deadline: urgentDeadline
          };
          expect(component.isUrgent()).toBe(false);
        });
        it("should not detect urgent for todo without deadline", () => {
          component.todo = {
            id: 1,
            text: "No Deadline Todo",
            completed: false,
            timestamp: /* @__PURE__ */ new Date()
          };
          expect(component.isUrgent()).toBe(false);
        });
      });
      describe("Template rendering", () => {
        it("should display todo text", () => {
          component.todo = {
            id: 1,
            text: "Test Todo Text",
            completed: false,
            timestamp: /* @__PURE__ */ new Date()
          };
          fixture.detectChanges();
          const todoText = fixture.nativeElement.querySelector(".todo-text");
          expect(todoText.textContent.trim()).toBe("Test Todo Text");
        });
        it("should show deadline info when deadline exists", () => {
          const deadline = /* @__PURE__ */ new Date();
          deadline.setDate(deadline.getDate() + 1);
          component.todo = {
            id: 1,
            text: "Todo with deadline",
            completed: false,
            timestamp: /* @__PURE__ */ new Date(),
            deadline
          };
          fixture.detectChanges();
          const deadlineInfo = fixture.nativeElement.querySelector(".deadline-info");
          expect(deadlineInfo).toBeTruthy();
        });
        it("should not show deadline info when no deadline", () => {
          component.todo = {
            id: 1,
            text: "Todo without deadline",
            completed: false,
            timestamp: /* @__PURE__ */ new Date()
          };
          fixture.detectChanges();
          const deadlineInfo = fixture.nativeElement.querySelector(".deadline-info");
          expect(deadlineInfo).toBeFalsy();
        });
        it("should show countdown when not completed and has time remaining", () => {
          const deadline = /* @__PURE__ */ new Date();
          deadline.setDate(deadline.getDate() + 2);
          component.todo = {
            id: 1,
            text: "Todo with countdown",
            completed: false,
            timestamp: /* @__PURE__ */ new Date(),
            deadline,
            timeRemaining: "2d 5h"
          };
          fixture.detectChanges();
          const countdown = fixture.nativeElement.querySelector(".countdown");
          expect(countdown).toBeTruthy();
          expect(countdown.textContent.trim()).toBe("2d 5h");
        });
        it("should not show countdown when completed", () => {
          const deadline = /* @__PURE__ */ new Date();
          deadline.setDate(deadline.getDate() + 1);
          component.todo = {
            id: 1,
            text: "Completed todo",
            completed: true,
            timestamp: /* @__PURE__ */ new Date(),
            deadline,
            timeRemaining: "1d 2h"
          };
          fixture.detectChanges();
          const countdown = fixture.nativeElement.querySelector(".countdown");
          expect(countdown).toBeFalsy();
        });
      });
    });
  }
});
export default require_todo_item_component_spec();
//# sourceMappingURL=spec-app-todo-item-todo-item.component.spec.js.map

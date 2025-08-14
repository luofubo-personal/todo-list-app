import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { of } from 'rxjs';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    // Create a mock TodoService with spy methods
    const spy = jasmine.createSpyObj('TodoService', ['getTodos', 'addTodo', 'updateTodo', 'deleteTodo']);

    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        { provide: TodoService, useValue: spy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // Get the spy service
    mockTodoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;

    // Set up default mock behavior
    mockTodoService.getTodos.and.returnValue(of([]));

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', () => {
    const mockTodos: Todo[] = [
      { id: 1, text: 'Test Todo', completed: false, timestamp: new Date() }
    ];

    mockTodoService.getTodos.and.returnValue(of(mockTodos));

    component.ngOnInit();

    expect(mockTodoService.getTodos).toHaveBeenCalled();
    expect(component.todos.length).toBe(1);
    expect(component.todos[0].text).toBe('Test Todo');
    // The component now adds default properties, so we check they exist
    expect(component.todos[0].deadline).toBeUndefined();
    expect(component.todos[0].isOverdue).toBe(false);
    expect(component.todos[0].priority).toBe(5);
  });

  it('should add todo without deadline', () => {
    const newTodo: Todo = {
      id: 1,
      text: 'New Todo',
      completed: false,
      timestamp: new Date()
    };

    mockTodoService.addTodo.and.returnValue(of(newTodo));

    component.newTodoText = 'New Todo';
    component.addTodo();

    expect(mockTodoService.addTodo).toHaveBeenCalled();
    const callArgs = mockTodoService.addTodo.calls.mostRecent().args[0];
    expect(callArgs.text).toBe('New Todo');
    expect(callArgs.completed).toBe(false);
    expect(component.newTodoText).toBe('');
    expect(component.newTodoDeadline).toBe('');
  });

  it('should add todo with deadline', () => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 1);

    const newTodo: Todo = {
      id: 1,
      text: 'Todo with deadline',
      completed: false,
      timestamp: new Date(),
      deadline: deadline
    };

    mockTodoService.addTodo.and.returnValue(of(newTodo));

    component.newTodoText = 'Todo with deadline';
    component.newTodoDeadline = deadline.toISOString().slice(0, 16);
    component.addTodo();

    expect(mockTodoService.addTodo).toHaveBeenCalled();
    const callArgs = mockTodoService.addTodo.calls.mostRecent().args[0];
    expect(callArgs.text).toBe('Todo with deadline');
    expect(callArgs.completed).toBe(false);
    expect(callArgs.deadline).toBeDefined();
    expect(component.newTodoText).toBe('');
    expect(component.newTodoDeadline).toBe('');
  });

  it('should not add empty todo', () => {
    component.newTodoText = '';
    component.addTodo();

    expect(mockTodoService.addTodo).not.toHaveBeenCalled();
  });

  it('should not add todo with only whitespace', () => {
    component.newTodoText = '   ';
    component.addTodo();

    expect(mockTodoService.addTodo).not.toHaveBeenCalled();
  });

  it('should toggle todo completion', () => {
    const todo: Todo = {
      id: 1,
      text: 'Test Todo',
      completed: false,
      timestamp: new Date()
    };

    mockTodoService.updateTodo.and.returnValue(of(todo));

    component.toggleComplete(todo);

    expect(todo.completed).toBe(true);
    expect(mockTodoService.updateTodo).toHaveBeenCalledWith(todo);
  });

  it('should delete todo', () => {
    const todo: Todo = {
      id: 1,
      text: 'Test Todo',
      completed: false,
      timestamp: new Date()
    };

    component.todos = [todo];
    mockTodoService.deleteTodo.and.returnValue(of(todo));

    component.deleteTodo(todo);

    expect(mockTodoService.deleteTodo).toHaveBeenCalledWith(1);
    expect(component.todos).toEqual([]);
  });

  it('should count incomplete todos correctly', () => {
    component.todos = [
      { id: 1, text: 'Todo 1', completed: false, timestamp: new Date() },
      { id: 2, text: 'Todo 2', completed: true, timestamp: new Date() },
      { id: 3, text: 'Todo 3', completed: false, timestamp: new Date() }
    ];

    expect(component.incompleteTodosCount).toBe(2);
  });

  describe('Deadline functionality', () => {
    it('should update countdowns for todos with deadlines', () => {
      const futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 2);

      const pastDate = new Date();
      pastDate.setHours(pastDate.getHours() - 1);

      component.todos = [
        {
          id: 1,
          text: 'Future Todo',
          completed: false,
          timestamp: new Date(),
          deadline: futureDate
        },
        {
          id: 2,
          text: 'Past Todo',
          completed: false,
          timestamp: new Date(),
          deadline: pastDate
        },
        {
          id: 3,
          text: 'No deadline Todo',
          completed: false,
          timestamp: new Date()
        }
      ];

      (component as any).updateCountdowns();

      expect(component.todos[0].timeRemaining).toContain('h');
      expect(component.todos[0].isOverdue).toBe(false);
      expect(component.todos[1].timeRemaining).toBe('Overdue');
      expect(component.todos[1].isOverdue).toBe(true);
      expect(component.todos[2].timeRemaining).toBeUndefined();
      expect(component.todos[2].isOverdue).toBe(false);
    });

    it('should format time remaining correctly', () => {
      const days2Hours3 = 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000;
      const hours5Minutes30 = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
      const minutes45 = 45 * 60 * 1000;

      expect((component as any).formatTimeRemaining(days2Hours3)).toBe('2d 3h');
      expect((component as any).formatTimeRemaining(hours5Minutes30)).toBe('5h 30m');
      expect((component as any).formatTimeRemaining(minutes45)).toBe('45m');
    });

    it('should handle completed todos with deadlines', () => {
      const futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 2);

      component.todos = [
        {
          id: 1,
          text: 'Completed Todo',
          completed: true,
          timestamp: new Date(),
          deadline: futureDate
        }
      ];

      (component as any).updateCountdowns();

      expect(component.todos[0].timeRemaining).toBeUndefined();
      expect(component.todos[0].isOverdue).toBe(false);
    });

    it('should clean up countdown interval on destroy', () => {
      spyOn(window, 'clearInterval');

      (component as any).countdownInterval = 123;
      component.ngOnDestroy();

      expect(window.clearInterval).toHaveBeenCalledWith(123);
    });

    it('should not clear interval if not set', () => {
      spyOn(window, 'clearInterval');

      (component as any).countdownInterval = undefined;
      component.ngOnDestroy();

      expect(window.clearInterval).not.toHaveBeenCalled();
    });
  });

  describe('Bug fix: Deadline property access', () => {
    it('should handle todos without deadline property gracefully', () => {
      // Simulate todos from API that might not have deadline properties
      const todosWithoutDeadlineProps = [
        { id: 1, text: 'Todo 1', completed: false, timestamp: new Date() },
        { id: 2, text: 'Todo 2', completed: true, timestamp: new Date() }
      ];

      mockTodoService.getTodos.and.returnValue(of(todosWithoutDeadlineProps as Todo[]));

      expect(() => {
        component.getTodos();
      }).not.toThrow();

      expect(component.todos.length).toBe(2);
      expect(component.todos[0].deadline).toBeUndefined();
      expect(component.todos[0].isOverdue).toBe(false);
      expect(component.todos[0].priority).toBe(5);
    });

    it('should handle updateCountdowns with undefined deadline properties', () => {
      component.todos = [
        { id: 1, text: 'Todo without deadline props', completed: false, timestamp: new Date() } as Todo,
        { id: 2, text: 'Todo with null deadline', completed: false, timestamp: new Date(), deadline: null } as any
      ];

      expect(() => {
        (component as any).updateCountdowns();
      }).not.toThrow();

      expect(component.todos[0].timeRemaining).toBeUndefined();
      expect(component.todos[0].isOverdue).toBe(false);
      expect(component.todos[1].timeRemaining).toBeUndefined();
      expect(component.todos[1].isOverdue).toBe(false);
    });

    it('should handle invalid date objects in updateCountdowns', () => {
      component.todos = [
        {
          id: 1,
          text: 'Todo with invalid date',
          completed: false,
          timestamp: new Date(),
          deadline: 'invalid-date' as any
        }
      ];

      spyOn(console, 'warn');

      expect(() => {
        (component as any).updateCountdowns();
      }).not.toThrow();

      expect(component.todos[0].timeRemaining).toBeUndefined();
      expect(component.todos[0].isOverdue).toBe(false);
    });

    it('should initialize all required properties when adding todos', () => {
      const newTodo: Todo = {
        id: 1,
        text: 'New Todo',
        completed: false,
        timestamp: new Date()
        // Note: no deadline properties
      };

      mockTodoService.addTodo.and.returnValue(of(newTodo));

      component.newTodoText = 'New Todo';
      component.addTodo();

      expect(component.todos.length).toBe(1);
      const addedTodo = component.todos[0];
      expect(addedTodo.deadline).toBeUndefined();
      expect(addedTodo.timeRemaining).toBeUndefined();
      expect(addedTodo.isOverdue).toBe(false);
      expect(addedTodo.priority).toBe(5);
    });

    it('should handle mixed todo data with and without deadline properties', () => {
      const mixedTodos = [
        { id: 1, text: 'Todo with deadline', completed: false, timestamp: new Date(), deadline: new Date() },
        { id: 2, text: 'Todo without deadline', completed: false, timestamp: new Date() },
        { id: 3, text: 'Todo with null deadline', completed: false, timestamp: new Date(), deadline: null }
      ];

      mockTodoService.getTodos.and.returnValue(of(mixedTodos as Todo[]));

      expect(() => {
        component.getTodos();
      }).not.toThrow();

      expect(component.todos.length).toBe(3);

      // Todo with deadline should have all properties
      expect(component.todos[0].deadline).toBeDefined();
      expect(component.todos[0].priority).toBeDefined();

      // Todo without deadline should have default values
      expect(component.todos[1].deadline).toBeUndefined();
      expect(component.todos[1].isOverdue).toBe(false);
      expect(component.todos[1].priority).toBe(5);

      // Todo with null deadline should be handled gracefully
      expect(component.todos[2].deadline).toBeUndefined();
      expect(component.todos[2].isOverdue).toBe(false);
      expect(component.todos[2].priority).toBe(5);
    });

    it('should handle error in date parsing gracefully', () => {
      component.todos = [
        {
          id: 1,
          text: 'Todo with problematic deadline',
          completed: false,
          timestamp: new Date(),
          deadline: 'not-a-date' as any // Invalid date string that will cause error
        }
      ];

      // The main test is that this doesn't throw an error
      expect(() => {
        (component as any).updateCountdowns();
      }).not.toThrow();

      // And that the todo is handled gracefully with safe defaults
      expect(component.todos[0].timeRemaining).toBeUndefined();
      expect(component.todos[0].isOverdue).toBe(false);
    });
  });
});
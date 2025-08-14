import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [TodoService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve todos from the API via GET', () => {
    const mockTodos: Todo[] = [
      { id: 1, text: 'Todo 1', completed: false, timestamp: new Date() },
      { id: 2, text: 'Todo 2', completed: true, timestamp: new Date() }
    ];

    service.getTodos().subscribe((todos: Todo[]) => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should retrieve todos with deadlines from the API via GET', () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 2);

    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 1);

    const mockTodos: Todo[] = [
      {
        id: 1,
        text: 'Urgent Todo',
        completed: false,
        timestamp: new Date(),
        deadline: futureDate,
        isOverdue: false,
        timeRemaining: '2h',
        priority: 2
      },
      {
        id: 2,
        text: 'Overdue Todo',
        completed: false,
        timestamp: new Date(),
        deadline: pastDate,
        isOverdue: true,
        timeRemaining: 'Overdue',
        priority: 1
      }
    ];

    service.getTodos().subscribe((todos: Todo[]) => {
      expect(todos.length).toBe(2);
      expect(todos[0].deadline).toEqual(futureDate);
      expect(todos[0].isOverdue).toBe(false);
      expect(todos[1].isOverdue).toBe(true);
      expect(todos[1].priority).toBe(1);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should add a todo via POST', () => {
    const newTodo: Todo = { id: 3, text: 'New Todo', completed: false, timestamp: new Date() };

    service.addTodo(newTodo).subscribe((todo: Todo) => {
      expect(todo).toEqual(newTodo);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos`);
    expect(req.request.method).toBe('POST');
    req.flush(newTodo);
  });

  it('should add a todo with deadline via POST', () => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 1);

    const newTodo: Todo = {
      id: 3,
      text: 'Todo with deadline',
      completed: false,
      timestamp: new Date(),
      deadline: deadline,
      priority: 3
    };

    service.addTodo(newTodo).subscribe((todo: Todo) => {
      expect(todo.deadline).toEqual(deadline);
      expect(todo.priority).toBe(3);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.deadline).toEqual(deadline);
    req.flush(newTodo);
  });

  it('should update a todo via PUT', () => {
    const updatedTodo: Todo = { id: 1, text: 'Updated Todo', completed: true, timestamp: new Date() };

    service.updateTodo(updatedTodo).subscribe((response: Todo | null) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('should delete a todo via DELETE', () => {
    const todoId = 1;

    service.deleteTodo(todoId).subscribe((response: Todo) => {
      expect(response).toBeDefined();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle error when getting todos fails', () => {
    const errorMessage = 'Server error';

    service.getTodos().subscribe((todos: Todo[]) => {
      expect(todos).toEqual([]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos`);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('should handle error when adding todo fails', () => {
    const newTodo: Todo = { id: 3, text: 'New Todo', completed: false, timestamp: new Date() };
    const errorMessage = 'Validation error';

    service.addTodo(newTodo).subscribe((todo: Todo | undefined) => {
      expect(todo).toBeUndefined();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos`);
    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
  });

  it('should handle error when updating todo fails', () => {
    const updatedTodo: Todo = { id: 1, text: 'Updated Todo', completed: true, timestamp: new Date() };

    service.updateTodo(updatedTodo).subscribe((response: Todo | null) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos/1`);
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });

  it('should handle error when deleting todo fails', () => {
    const todoId = 1;

    service.deleteTodo(todoId).subscribe((response: Todo) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos/1`);
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });

  describe('Bug fix: Deadline property handling', () => {
    it('should handle todos without deadline properties from API', () => {
      const todosWithoutDeadlines = [
        { id: 1, text: 'Todo 1', completed: false, timestamp: new Date() },
        { id: 2, text: 'Todo 2', completed: true, timestamp: new Date() }
      ];

      service.getTodos().subscribe((todos: Todo[]) => {
        expect(todos.length).toBe(2);
        expect(todos[0].deadline).toBeUndefined();
        expect(todos[1].deadline).toBeUndefined();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/todos`);
      expect(req.request.method).toBe('GET');
      req.flush(todosWithoutDeadlines);
    });

    it('should handle mixed todos with and without deadline properties', () => {
      const mixedTodos = [
        { id: 1, text: 'Todo with deadline', completed: false, timestamp: new Date(), deadline: new Date() },
        { id: 2, text: 'Todo without deadline', completed: false, timestamp: new Date() },
        { id: 3, text: 'Todo with null deadline', completed: false, timestamp: new Date(), deadline: null }
      ];

      service.getTodos().subscribe((todos: Todo[]) => {
        expect(todos.length).toBe(3);
        expect(todos[0].deadline).toBeDefined();
        expect(todos[1].deadline).toBeUndefined();
        expect(todos[2].deadline).toBeNull();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/todos`);
      expect(req.request.method).toBe('GET');
      req.flush(mixedTodos);
    });

    it('should handle adding todo without deadline properties', () => {
      const todoWithoutDeadline = {
        id: 0,
        text: 'New Todo',
        completed: false,
        timestamp: new Date()
      };

      const returnedTodo = {
        id: 1,
        text: 'New Todo',
        completed: false,
        timestamp: new Date()
      };

      service.addTodo(todoWithoutDeadline).subscribe((todo: Todo) => {
        expect(todo.id).toBe(1);
        expect(todo.deadline).toBeUndefined();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/todos`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body.deadline).toBeUndefined();
      req.flush(returnedTodo);
    });

    it('should handle API response with malformed deadline data', () => {
      const todosWithMalformedDeadlines = [
        { id: 1, text: 'Todo 1', completed: false, timestamp: new Date(), deadline: 'invalid-date' },
        { id: 2, text: 'Todo 2', completed: false, timestamp: new Date(), deadline: {} }
      ];

      service.getTodos().subscribe((todos: any[]) => {
        expect(todos.length).toBe(2);
        // Service should return the data as-is, component handles validation
        expect(todos[0].deadline).toBe('invalid-date');
        expect(todos[1].deadline).toEqual({});
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/todos`);
      expect(req.request.method).toBe('GET');
      req.flush(todosWithMalformedDeadlines);
    });
  });
});
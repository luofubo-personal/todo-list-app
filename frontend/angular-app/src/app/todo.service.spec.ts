import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { environment } from '../environments/environment';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
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

  it('should add a todo via POST', () => {
    const newTodo: Todo = { id: 3, text: 'New Todo', completed: false, timestamp: new Date() };

    service.addTodo(newTodo).subscribe((todo: Todo) => {
      expect(todo).toEqual(newTodo);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos`);
    expect(req.request.method).toBe('POST');
    req.flush(newTodo);
  });

  it('should update a todo via PUT', () => {
    const updatedTodo: Todo = { id: 1, text: 'Updated Todo', completed: true, timestamp: new Date() };

    service.updateTodo(updatedTodo).subscribe((response: any) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('should delete a todo via DELETE', () => {
    const todoId = 1;

    service.deleteTodo(todoId).subscribe((response: any) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
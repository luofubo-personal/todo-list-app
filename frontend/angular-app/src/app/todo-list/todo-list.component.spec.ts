import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../todo.service';
import { of } from 'rxjs';
import { Todo } from '../todo';
import { FormsModule } from '@angular/forms';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    // Create a mock TodoService with spy methods
    const spy = jasmine.createSpyObj('TodoService', ['getTodos', 'addTodo', 'updateTodo', 'deleteTodo']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ TodoListComponent ],
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
});
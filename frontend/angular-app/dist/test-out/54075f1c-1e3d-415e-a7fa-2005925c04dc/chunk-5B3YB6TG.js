import {
  HttpClient,
  HttpHeaders,
  Injectable,
  __decorate,
  __esm,
  catchError,
  init_core,
  init_esm,
  init_http,
  init_operators,
  init_tslib_es6,
  of
} from "./chunk-SWVXNRRB.js";

// src/environments/environment.ts
var environment;
var init_environment = __esm({
  "src/environments/environment.ts"() {
    "use strict";
    environment = {
      production: false,
      apiUrl: "http://localhost:5001"
    };
  }
});

// src/app/todo.service.ts
var _a, TodoService;
var init_todo_service = __esm({
  "src/app/todo.service.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_http();
    init_esm();
    init_operators();
    init_environment();
    TodoService = (_a = class {
      constructor(http) {
        this.http = http;
        this.todosUrl = environment.apiUrl + "/api/todos";
        this.httpOptions = {
          headers: new HttpHeaders({ "Content-Type": "application/json" })
        };
      }
      /** GET todos from the server */
      getTodos() {
        return this.http.get(this.todosUrl).pipe(catchError(this.handleError("getTodos", [])));
      }
      /** GET todo by id. Will 404 if id not found */
      getTodo(id) {
        const url = `${this.todosUrl}/${id}`;
        return this.http.get(url).pipe(catchError(this.handleError(`getTodo id=${id}`)));
      }
      /** POST: add a new todo to the server */
      addTodo(todo) {
        return this.http.post(this.todosUrl, todo, this.httpOptions).pipe(catchError(this.handleError("addTodo")));
      }
      /** PUT: update the todo on the server */
      updateTodo(todo) {
        const url = `${this.todosUrl}/${todo.id}`;
        return this.http.put(url, todo, this.httpOptions).pipe(catchError(this.handleError("updateTodo")));
      }
      /** DELETE: delete the todo from the server */
      deleteTodo(id) {
        const url = `${this.todosUrl}/${id}`;
        return this.http.delete(url, this.httpOptions).pipe(catchError(this.handleError("deleteTodo")));
      }
      /**
       * Handle Http operation that failed.
       * Let the app continue.
       * @param operation - name of the operation that failed
       * @param result - optional value to return as the observable result
       */
      handleError(operation = "operation", result) {
        return (error) => {
          console.error(`${operation} failed:`, error);
          let errorMessage = "An unexpected error occurred";
          if (error.error) {
            if (typeof error.error === "string") {
              errorMessage = error.error;
            } else if (error.error.message) {
              errorMessage = error.error.message;
            } else if (error.error.title) {
              errorMessage = error.error.title;
            }
          } else if (error.message) {
            errorMessage = error.message;
          }
          console.warn(`User message: ${errorMessage}`);
          return of(result);
        };
      }
    }, _a.ctorParameters = () => [
      { type: HttpClient }
    ], _a);
    TodoService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], TodoService);
  }
});

export {
  environment,
  init_environment,
  TodoService,
  init_todo_service
};
//# sourceMappingURL=chunk-5B3YB6TG.js.map

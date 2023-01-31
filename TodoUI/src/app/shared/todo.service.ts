import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    formData: Todo = new Todo();
    readonly baseURL: string = "https://localhost:7134/api/Todos";
    list: Todo[] = [];

    constructor(private http: HttpClient) { }

    postTodo() {
        return this.http.post(this.baseURL, this.formData);
    }

    putTodo() {
        return this.http.put(`${this.baseURL}/${this.formData.id}`, this.formData);
    }

    deleteTodo(id: number) {
        return this.http.delete(`${this.baseURL}/${id}`);
    }

    refreshList() {
        let getRes = this.http.get(this.baseURL);
        lastValueFrom(getRes).then(res => this.list = res as Todo[]);
    }
}

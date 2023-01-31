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
    filtering: boolean = false;
    list: Todo[] = [];
    listAll: Todo[] = [];
    listUncompleted: Todo[] = [];

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

    async refreshList() {
        let getRes = this.http.get(this.baseURL);
        await lastValueFrom(getRes).then(res => this.listAll = res as Todo[]);
        this.listUncompleted = this.listAll.filter(todo => !todo.completed);
        this.filterList();
    }

    setFiltering(filtering: boolean) {
        this.filtering = filtering;
        this.filterList();
    }

    filterList() {
        if (this.filtering) this.list = this.listUncompleted.slice();
        else this.list = this.listAll.slice();
    }
}

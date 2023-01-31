import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/shared/todo.model';

import { TodoService } from 'src/app/shared/todo.service';

@Component({
    selector: 'app-todo-form',
    templateUrl: './todo-form.component.html',
    styles: [
    ]
})
export class TodoFormComponent implements OnInit {
    constructor(public service: TodoService, private toastr: ToastrService) { }

    ngOnInit(): void { }

    onSubmit(form: NgForm) {
        if (this.service.formData.id == 0) this.createTodo(form);
        else this.updateTodo(form);
    }

    createTodo(form: NgForm) {
        this.service.postTodo().subscribe({
            next: resp => {
                this.resetForm(form);
                this.service.refreshList();
                this.toastr.success("To-do added successfully", "To-do");
            },
            error: err => { console.log(err); }
        });
    }

    updateTodo(form: NgForm) {
        this.service.putTodo().subscribe({
            next: resp => {
                this.resetForm(form);
                this.service.refreshList();
                this.toastr.info("To-do updated successfully", "To-do");
            },
            error: err => { console.log(err); }
        });
    }

    resetForm(form: NgForm) {
        form.form.reset();
        this.service.formData = new Todo();
    }
}

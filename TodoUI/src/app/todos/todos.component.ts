import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styles: [
    ]
})
export class TodosComponent implements OnInit {
    constructor(public service: TodoService, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.service.refreshList();
    }

    populateForm(selected: Todo) {
        this.service.formData = Object.assign({}, selected);
        this.toastr.info("Form successfully filled for editing to-do", "To-do");
    }

    onDelete(id: number) {
        if (confirm("Are you sure you want to delete this to-do?")) {
            this.service.deleteTodo(id).subscribe({
                next: resp => {
                    this.service.refreshList();
                    this.toastr.error("To-do deleted successfully", "To-do");
                },
                error: err => { console.log(err); }
            });
        }
    }

    onFilter() {
        let checkbox = document.getElementById("filter") as HTMLInputElement;
        this.service.setFiltering(checkbox.checked);
    }
}

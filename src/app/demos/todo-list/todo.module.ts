import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TodoComponent } from "./todo.component";
import { TasksService } from "./todo.service";
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksFinalizadasComponent } from './components/tasks-finalizadas/tasks-finalizadas.component';
import { TasksIniciadasComponent } from './components/tasks-iniciadas/tasks-iniciadas.component';
import { Store } from "./todo.store";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        TasksService,
        Store
    ],
    declarations: [
        TodoComponent,
        TodoListComponent,
        TasksComponent,
        TasksFinalizadasComponent,
        TasksIniciadasComponent
    ],
    exports: [
        TodoComponent
    ]
})

export class TodoModule { }
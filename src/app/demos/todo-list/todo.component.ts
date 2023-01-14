import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from "@angular/core";
import { FormBuilder, FormControlName, FormGroup, Validators } from "@angular/forms";
import { fromEvent, merge, Observable } from "rxjs";
import { DisplayMessage, GenericValidator, ValidationMessages } from "../reactiveForms/cadastro/generic-form-validation";
import { Task } from "./task";
import { TasksService } from "./todo.service";

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo.component.html',
})

export class TodoComponent implements OnInit, AfterViewInit {
    cadastroTarefaNova: FormGroup;
    task: Task;

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    validationMessages: ValidationMessages;
    genericValidator: GenericValidator;
    displayMessage: DisplayMessage = {};

    mudancasNaoSalvas: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private taskService: TasksService
    ) {
        this.validationMessages = {
            novaTarefa: {
                minlength: 'O Nome precisa ter no mínimo 4 caracteres',
                maxlength: 'O Nome precisa ter no máximo 60 caracteres'
            },
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.cadastroTarefaNova = this.formBuilder.group({
            novaTarefa: ['', [Validators.minLength(4), Validators.maxLength(60)]]
        })
    }

    ngAfterViewInit(): void {
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(...controlBlurs).subscribe(() => {
            this.displayMessage = this.genericValidator.processarMensagens(this.cadastroTarefaNova);
            this.mudancasNaoSalvas = true;
        });
    }

    adicionarTarefa() {
        this.task = {
            finalizado: false,
            iniciado: false,
            nome: this.cadastroTarefaNova.get('novaTarefa').value
        }
        const task = {
            task: this.task
        }

        this.taskService.toggle(task);
        this.limparCampo();
    }

    validarCampo() {
        return !(this.cadastroTarefaNova.get('novaTarefa').value.length >= 4) || !(this.cadastroTarefaNova.get('novaTarefa').value.length <= 60)
    }

    limparCampo() {
        this.cadastroTarefaNova.get('novaTarefa').patchValue('')
    }
}
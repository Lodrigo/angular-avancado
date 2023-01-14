import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { Observable, Observer} from 'rxjs';
import { TasksService } from './todo.service';
import { Store } from './todo.store';
import { Task } from './task';

const todoList: Task[] = [{ id: 1, nome: 'Responder e-mails', finalizado: true, iniciado: false }]

function createResponse(body) {
    return new Observable((observer: Observer<any>) => {
        observer.next(body)
    });
}


//Mocar uma simulação do http como se fosse o do angualr ao invés de usar-lo
class MockHttp {
    get() {
        return createResponse(todoList);
    }
}

describe('TodoService', () => {
    let service: TasksService;
    let http: HttpClient;

    beforeEach(() => {
        const bed = TestBed.configureTestingModule({
            providers: [
                //Estou injetando o http client, mas quem trabalha no lugar dele é o MockHttp
                //Aqui é substituido
                { provide: HttpClient, useClass: MockHttp },
                Store,
                TasksService
            ]
        })

        // Aqui estou obtendo a instancia de HttpClient, mas obtenho MockHttp pois fiz a substituição dele anteriormete
        http = bed.get(HttpClient);
        service = bed.get(TasksService);
    })

    it('Deve retornar a lista de tarefas', () => {
        /*
            Resultado mocado. Não precisa usar o spyOn quando é mocado.
            Se fosse usar o HttpClient diretamente ai sim seria indicado o uso do spyOn
        */
        //spyOn(http, 'get').and.returnValue(createResponse(todoList));

        //Ao chamar este método precisa ter uma subscribe, pois ele retorna uma observable e precisa completa-la
        service.getTodoList$.subscribe((result) => {
            expect(result.length).toBe(1);
            expect(result).toEqual(todoList);

            console.log('RETORNO Ok', result);
            console.log('LISTA MOCADA', todoList);
        })
    })
})
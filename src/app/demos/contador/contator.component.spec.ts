import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContadorComponent } from './contator.component';

describe('ContatorComponent', () => {
    let component: ContadorComponent;
    let fixture: ComponentFixture<ContadorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ContadorComponent
            ]
        });

        fixture = TestBed.createComponent(ContadorComponent);
        component = fixture.componentInstance;

        component.valor = 0;
    })

    it('Deve incrementar corretamente', () => {
        component.incrementar();
        expect(component.valor).toBe(1);
    })

    it('Deve decrementar corretamente', () => {
        component.valor = 1;
        component.decrementar();
        expect(component.valor).toBe(0);
    })

    it('Não Deve incrementar abaixo do valor permitido', () => {
        component.valor = 100;
        component.incrementar();
        expect(component.valor).toBe(100);
    })

    it('Não Deve decrementar abaixo do valor permitido', () => {
        component.valor = 0;
        component.decrementar();
        expect(component.valor).toBe(0);
    })
})
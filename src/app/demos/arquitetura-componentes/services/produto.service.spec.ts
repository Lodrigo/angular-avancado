import { TestBed } from '@angular/core/testing';

import { Produto } from '../models/produto';
import { ProdutoService } from './produto.service';

const produtosFake: Produto[] = [
    {
        id: 1,
        nome: 'Teste',
        ativo: true,
        valor: 100,
        imagem: 'celular.jpg'
    },
    {
        id: 2,
        nome: 'Teste2',
        ativo: true,
        valor: 200,
        imagem: 'gopro.jpg'
    },
    {
        id: 3,
        nome: 'Teste3',
        ativo: true,
        valor: 300,
        imagem: 'laptop.jpg'
    }
]

const produtoFake: Produto =
{
    id: 2,
    nome: 'Teste2',
    ativo: true,
    valor: 200,
    imagem: 'gopro.jpg'
}


describe('ProdutoService', () => {
    let service: ProdutoService;
    
    //Padrão para configurar um serviço para teste
    beforeEach(() => {
        const bed = TestBed.configureTestingModule({
            providers: [
                ProdutoService
            ]
        });
        
        service = bed.get(ProdutoService);
    })

    //Padrão
    it('Deve retornar uma lista de produtos', () => {
        //spyOn recebe o serviço criado no beforeach e o método que precisa.
        //returnValue é setado o valor mocado
        spyOn(service, 'obterTodos').and.returnValue(produtosFake);

        //Chamada do método para obter todos
        let result = service.obterTodos('ativos');

        //Lista retornada deve conter 3 objetos
        expect(result.length).toBe(3);

        expect(result).toEqual(produtosFake)
    })

    it('Deve retornar apenas um produto', () => {
        spyOn(service, 'obterPorId').and.returnValue(produtoFake);
        let result = service.obterPorId(2);

        expect(result).toEqual(produtoFake);
        expect(result.id).toEqual(2);
    })
})
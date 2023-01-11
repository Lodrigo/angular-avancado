import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable()

export class ProdutoService {
  produtos: Produto[];

  constructor() {
    this.produtos = [
      {
        id: 1,
        nome: 'teste',
        ativo: true,
        valor: 100,
        imagem: 'celular.jpg'
      },
      {
        id: 2,
        nome: 'teste2',
        ativo: true,
        valor: 200,
        imagem: 'gopro.jpg'
      }, 
      {
        id: 3,
        nome: 'teste3',
        ativo: true,
        valor: 300,
        imagem: 'laptop.jpg'
      },
      {
        id: 5,
        nome: 'teste 5',
        ativo: true,
        valor: 500,
        imagem: 'teclado.jpg'
      },
      {
        id: 1,
        nome: 'teste',
        ativo: true,
        valor: 100,
        imagem: 'celular.jpg'
      },
      {
        id: 6,
        nome: 'teste 6',
        ativo: true,
        valor: 600,
        imagem: 'headset.jpg'
      }
    ]
  }

  obterTodos(estado: string): Produto[] {
    if(estado == 'ativos') {
      return this.produtos.filter(produto => produto.ativo)
    }
    return this.produtos
  }

  obterProduto(id: number): Produto {
    return this.produtos.find(produto => produto.id == id)
  }
}

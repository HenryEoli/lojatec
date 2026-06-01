import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  private http = inject(HttpClient);
  private carrinhoService = inject(CarrinhoService);

  produtos: Produto[] = [];
  loading = true;

  ngOnInit(): void {
    this.http.get<Produto[]>('https://backend.render.com/api/produtos')
      .subscribe({
        next: (data) => {
          this.produtos = data;
          this.loading = false;
        },
        error: () => this.loading = false
      });
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.carrinhoService.adicionar(produto);
  }
}

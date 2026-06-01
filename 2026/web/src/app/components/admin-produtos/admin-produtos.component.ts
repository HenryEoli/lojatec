import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-admin-produtos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-produtos.component.html',
  styleUrl: './admin-produtos.component.css'
})
export class AdminProdutosComponent implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = 'https://backend.render.com/api/produtos';

  produtos: Produto[] = [];
  loading = true;

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.http.get<Produto[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.produtos = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => this.carregarProdutos(),
        error: (err) => alert('Erro ao excluir: ' + err.message)
      });
    }
  }
}

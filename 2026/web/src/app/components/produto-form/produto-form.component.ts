import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css'
})
export class ProdutoFormComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiUrl = 'https://backend.render.com/api/produtos';

  isEditing = false;
  produto: Produto = {
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0,
    categoriaId: 0
  };
  categorias: Categoria[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.http.get<Produto>(`${this.apiUrl}/${id}`).subscribe({
        next: (data) => this.produto = data
      });
    }

    this.http.get<Categoria[]>('https://backend.render.com/api/categorias').subscribe({
      next: (data) => this.categorias = data
    });
  }

  salvar(): void {
    const request = this.isEditing
      ? this.http.put(`${this.apiUrl}/${this.produto.id}`, this.produto)
      : this.http.post(this.apiUrl, this.produto);

    request.subscribe({
      next: () => this.router.navigate(['/admin/produtos']),
      error: (err) => alert('Erro ao salvar: ' + err.message)
    });
  }
}

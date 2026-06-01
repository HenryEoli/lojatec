import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
  carrinhoService = inject(CarrinhoService);

  finalizarPedido(): void {
    this.carrinhoService.finalizarPedido().subscribe({
      next: () => alert('Pedido realizado com sucesso!'),
      error: (err) => alert('Erro ao finalizar pedido: ' + err.message)
    });
  }
}

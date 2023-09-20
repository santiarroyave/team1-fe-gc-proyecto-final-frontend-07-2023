import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReservasOfertas } from 'src/app/models/ReservasOfertas';

@Component({
  selector: 'app-reserva-item',
  templateUrl: './reserva-item.component.html',
  styleUrls: ['./reserva-item.component.css']
})
export class ReservaItemComponent {
  @Input() reserva: any = {};
  @Output() detalle = new EventEmitter<string>();

  onDetalle() {
    this.detalle.emit(this.reserva.id);
  }

  getPrice(reserva:ReservasOfertas): number{
    let precio_total = 0;
    const fFinal:Date = new Date(reserva.fechaFinal);
    const fIni:Date = new Date(reserva.fechaIni);
    const total_noches = fFinal.getDate() - fIni.getDate();    
    precio_total = reserva.precioOferta * total_noches;
    return precio_total;
  }
}

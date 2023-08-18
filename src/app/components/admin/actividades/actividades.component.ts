import { Component } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent {
  actividades: any = [];

  constructor(private actividadesService: ActividadesService) {}

  ngOnInit(): void {
      this.actividades = this.actividadesService.getAllActividades();
  }
}

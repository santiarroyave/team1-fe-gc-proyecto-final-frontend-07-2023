import { Component, OnInit, HostListener } from '@angular/core';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  ofertas: any = [];
  ofertas_mostradas: any = [];
  nombre: string = '';

  menuColapsado = false;
  // Escucha el evento 'resize' en la ventana del navegador (host).
  // Cuando la ventana cambia de tamaño (por ejemplo, se cambia el tamaño de la pantalla o se rota el dispositivo móvil),
  // se ejecuta la función 'onResize()'.
  // El parámetro '$event' captura los datos del evento que contiene información sobre el cambio de tamaño de la ventana.
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectScreenSize();
  }

  constructor(private ofertasService: OfertasService) {}

  ngOnInit(): void {
    this.detectScreenSize();
    this.ofertas = this.ofertasService.getAllOfertas();
    this.ofertas_mostradas = this.ofertas;
  }

  // Esta función detecta cuando la pantalla llega al limite de colapsamiento del menu
  detectScreenSize() {
    let windowWidth = window.innerWidth;
    let limite = 992;

    if(windowWidth < limite){
      this.menuColapsado = true;
    }else{
      this.menuColapsado = false;
    }
  }

  actualizarListaOfertas(nombre_oferta: any):void {    
    this.nombre = nombre_oferta;
    this.ofertas_mostradas = this.ofertas.filter((oferta:any) => oferta.titulo.toLowerCase().includes(this.nombre.toLowerCase()))
  }
}
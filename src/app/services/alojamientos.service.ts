import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import db from '../../assets/db.json'
import { AlojamientoCrear } from '../models/alojamientos/AlojamientoCrear';
import { AlojamientoCompleto } from '../models/alojamientos/AlojamientoCompleto';
import { redis_v1 } from 'googleapis';
import { AlojamientoCard } from '../models/alojamientos/AlojamientoCard';

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {

  baseUrl: string = "api/Alojamientoes";

  constructor(private http:HttpClient) { }

  getAllAlojamientos(): Observable<AlojamientoCard[]> {
    return this.http.get<AlojamientoCard[]>(this.baseUrl);
  }

  getAlojamientoById(id:number): Observable<AlojamientoCompleto>{
    return this.http.get<any>(this.baseUrl + "/" + id + "/completo").pipe(
      map((response) => {
        const alojamiento: AlojamientoCompleto = {
          id: response.id,
          nombre: response.nombre,
          categoria: response.categoria,
          telefono: response.telefono,
          email: response.email,
          direccion: {
            id: response.direccion.id,
            pais: response.direccion.pais,
            calle: response.direccion.calle,
            numero: response.direccion.numero,
            codigoPostal: response.direccion.codigoPostal,
            provincia: response.direccion.provincia,
            localidad: response.direccion.localidad
          },
          imagenes: response.imagenes,
          servicios: response.servicios
        };
        return alojamiento;
      })
    );
  }

  updateAlojamiento(alojamiento: AlojamientoCompleto): Observable<AlojamientoCompleto>{
    return this.http.put<AlojamientoCompleto>(`${this.baseUrl}/${alojamiento.id}`, alojamiento);
  }

  addAlojamiento(alojamiento: AlojamientoCrear){
    this.http.post<AlojamientoCrear>(this.baseUrl, alojamiento).subscribe(
      () => {
        console.log('alojamiento subida correctamente');
        console.log(alojamiento);
      },
      (error) => {
        console.error("Ha habido un errooooooooor aaaaaaaaaaaaaahhhhh" + error);
        throw error;
      }
    );
  }
}

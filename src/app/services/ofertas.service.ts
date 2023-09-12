import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import db from '../../assets/db.json'
import { Favorito } from '../models/Favorito';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {
  oferta: any;

  baseUrl: string = "api/Ofertas";

  constructor(private http:HttpClient) { }

  getAllOfertas(): Observable<Oferta[]>{
    return this.http.get<Oferta[]>(this.baseUrl);
  }

  getOfertaById(id:number): Observable<Oferta>{
    return this.http.get<Oferta>(this.baseUrl + "/" + id).pipe(
      map((response) => {
        const oferta: Oferta = {
          id: response.id,
          titulo: response.titulo,
          descripcion: response.descripcion,
          precio: response.precio,
          maxPersonas: response.maxPersonas,
          fechaInicio: response.fechaInicio,
          fechaFin: response.fechaFin,
          ofertasDisponibles: response.ofertasDisponibles,
          idAlojamiento: response.idAlojamiento
        };
        return oferta;
      })
    );
  }

  postFavorito(fav:Favorito):Observable<any>{
    return this.http.post(this.baseUrl+'Favoritoes',fav);
  }
}

}

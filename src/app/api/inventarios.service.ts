import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventariosService {
  public url = 'https://inventariosqr.azurewebsites.net';

  constructor(public _http: HttpClient) { }

  addInventario(inventario): Observable<any> {
    const params = JSON.stringify(inventario);
    const headers = new HttpHeaders().set('Content-Type' , 'application/json');
    return this._http.post(this.url + '/inventario/nuevo', params, { headers : headers });
  }

  getInventarios(): Observable<any> { // Obtener todos los inventarios 
    return this._http.get(this.url + '/inventarios');
  }

  getInventario(idInventario) { // Obtener un invantario en particular
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + '/inventario/busca/' + idInventario, { headers : headers });
  }

  deleteInventario(idInventario): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + '/inventario/delete/' + idInventario, {headers: headers});
  }

}

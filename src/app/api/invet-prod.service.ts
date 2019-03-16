import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvetProdService {

  public url = 'https://inventariosqr.azurewebsites.net';

  constructor(public _http: HttpClient) { }

  getInventProductos(idInventario): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + '/invetarioproducto/busca/' + idInventario, {headers: headers});
  }

  addProductoInventario(productoInventario): Observable<any> { // Crea un producto en un inventario y si ya esta este se actualiza
    const params = JSON.stringify(productoInventario);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + '/invetarioproducto/nuevo', params,{headers: headers});

  }

  deleteInventProductos(idProd, idInvet): Observable<any> {
    const datosEnviar = idInvet + ';' + idProd;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + '/invetarioproducto/delete/' + datosEnviar, {headers: headers});
  }
}

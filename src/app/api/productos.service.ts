import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  public url = 'https://inventariosqr.azurewebsites.net';

  constructor(public _http: HttpClient) { }

  addProducto(producto): Observable<any> {
    const params = JSON.stringify(producto);
    const headers = new HttpHeaders().set('Content-Type' , 'application/json');
    return this._http.post(this.url + '/producto/nuevo', params, { headers : headers });
  }

  getProductos(): Observable<any> { // Trae un objeto JSON con todos los productos
    return this._http.get<any>(this.url + '/productos');
  }

  getProducto(idProducto): Observable<any> { // Solo un producto
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + '/producto/busca/' + idProducto , { headers : headers });
  }

  updateProducto(idProducto, proctoNuevo): Observable<any> {
    const params = JSON.stringify(proctoNuevo);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + '/producto/actualiza/' + idProducto , params, {headers: headers});
  }

  deleteProducto(idProducto): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + '/producto/delete/' + idProducto,  {headers: headers}) ;
  }

}

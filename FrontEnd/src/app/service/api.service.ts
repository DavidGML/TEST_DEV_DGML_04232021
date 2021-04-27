import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { Persona } from '../models/persona';

const httpOptions = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'https://localhost:44372/api/persona';

  constructor( private http: HttpClient ) { }

  //service get
  getPersona(): Observable<Response> {
    return this.http.get<Response>(this.url);
  }

  //service post
  addPersona(persona: Persona): Observable<Response> {
    return this.http.post<Response>(this.url, persona, httpOptions);
  }

  //service put
  editPersona( persona: Persona ): Observable<Response> {
    return this.http.put<Response>(this.url, persona, httpOptions);
  }

  //service delete
  deletePersona( idPersonaFisica:number ): Observable<Response> {
    return this.http.delete<Response>(`${this.url}/${idPersonaFisica}`);
  }
}

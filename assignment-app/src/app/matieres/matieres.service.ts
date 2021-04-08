import { map } from 'rxjs/operators';
import { Matiere } from './matiere.model';
import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient, HttpResponse, HttpRequest, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";

import {api} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class MatieresService {
  

  constructor(private http: HttpClient) { }

 

  getMatieres():Observable<Matiere[]> {

   
    return this.http.get<Matiere[]>(`${api}matieres/tous`);
    
  }
  getMatieresPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Matiere[]>(`${api}matieres`+"?page="+page + "&limit="+limit);
  }
  addMatiere(nom:string,prof:string,image:string):Observable<any>{

    const body={
     nom,
     prof,
     image
    };

    return this.http.post(`${api}matiere`, body);

  }
  

  //update matiere 
  updateMatiere(id:string,nom:string,prof:string,image:string):Observable<any> {
    const body={
      id,
      nom,
      prof,
      image
    }
    return this.http.put(`${api}matiere`,body);

  }

  getMatiere(id:String):Observable<any>{
    return this.http.get(`${api}matiere/` +id);
  }
  deleteMatiere(id:String):Observable<any> {
   
    return this.http.delete(`${api}matiere/` +id);

  }


}

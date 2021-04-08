import { Utilisateur } from './utilisateur.model';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {api} from "../../environments/environment";
import {catchError, map,tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  utilisateurs:Utilisateur[];
  constructor(private http:HttpClient) { }


  getMoi():Observable<Utilisateur>{
      
    return this.http.get<Utilisateur>(`${api}utilisateur/moi`);
  }
  getUtilisateurs():Observable<Utilisateur[]> {
   
   
    return this.http.get<Utilisateur[]>(`${api}utilisateurs`);
    
  }
  getUtilisateursPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Utilisateur[]>(`${api}utilisateurs`+"?page="+page + "&limit="+limit);
  }
  getUser(id:String):Observable<any>{
    return this.http.get<Utilisateur>(`${api}utilisateur/${id}`);
  }
  register(nom:string,prenom:string,email:string,role:string,motDePasse:string,image:string):Observable<any>{
    const body={
      nom,
      prenom,
      email,
      role,
      motDePasse,
      image
    }
    return this.http.post(`${api}utilisateur/register`,body);
 
  }
  getUserByRole(role:string):Observable<any>{

    return this.http.get<Utilisateur>(`${api}user/${role}`);

  }

  updateUtilisateur(id:string,nom:string,prenom:string,email:string,role:string,motDePasse:string,image:string):Observable<any> {
    const body={
      id,
      nom,
      prenom,
      email,
      role,
      motDePasse,
      image
    }
    return this.http.put(`${api}utilisateurs`,body);

  }

  private handleError(operation: string, result?: any): (error: any) => Observable<any> {
    return (error: any): Observable<any> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
      return of(result);
    };
  }
}

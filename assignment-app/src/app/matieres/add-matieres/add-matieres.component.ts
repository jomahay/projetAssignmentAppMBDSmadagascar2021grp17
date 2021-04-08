import { Role } from './../../shared/Role';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';
import { MatieresService } from '../matieres.service';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import { Utilisateur } from 'src/app/shared/utilisateur.model';

@Component({
  selector: 'app-add-matieres',
  templateUrl: './add-matieres.component.html',
  styleUrls: ['./add-matieres.component.css']
})
export class AddMatieresComponent implements OnInit {


  nom:string='';
  prof:string='';
  successSnackBar:MatSnackBarRef<TextOnlySnackBar>;
  professeurs:Utilisateur[];
  image:string='';
 
  


  constructor( private route: ActivatedRoute,
    private router: Router,private utilisateurService:UtilisateurService ,private matieresService:MatieresService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {

    this.getProfesseur();
  }

 

addMatiere() {
  
 this.matieresService.addMatiere(this.nom,this.prof,this.image).subscribe(data => {
    console.log(data);
    if(data){
      console.log(data);
     
      this.router.navigate(["/matiere"],{replaceUrl:true});
      this.successSnackBar = this.snackBar.open(data.message ,"", {
        duration: 2000,
      });
    }
    }, error => {
 
      console.log(error.error.message);
      this.successSnackBar = this.snackBar.open(error.error.message,"", {
        duration: 2000,
      });
      this.router.navigate(["/addMatiere"]);
    });    
}

getProfesseur(){
  console.log(Role.PROF)
  this.utilisateurService.getUserByRole(Role.PROF).subscribe(professeurs=>{

    console.log(professeurs)
    this.professeurs=professeurs;
    console.log(this.professeurs)
  })
}

}

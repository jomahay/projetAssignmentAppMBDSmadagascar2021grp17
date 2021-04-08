import { Role } from './../../shared/Role';
import { Component, OnInit } from '@angular/core';

import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-utilisateurs',
  templateUrl: './add-utilisateurs.component.html',
  styleUrls: ['./add-utilisateurs.component.css']
})
export class AddUtilisateursComponent implements OnInit {
  fileToUpload: File = null;
  formGroup: FormGroup ;
  nom:string;
  prenom:string;
  email:string;
  role:string;
  motDePasse:string;
  image:string;
  rolesAafficher=Object.values(Role);
  successSnackBar:MatSnackBarRef<TextOnlySnackBar>;

  constructor(private utilisateurService:UtilisateurService, private router: Router,private snackBar:MatSnackBar) { }

  ngOnInit(): void {

    this.formGroup= new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      motDePasse: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    
    });
  }

getErrorEmail():string{
  if(this.formGroup.controls.email.hasError('required')){
    return "Email obligatoire";
  }
  if(this.formGroup.controls.email.hasError('email')){
    return "Email invalide";
  }

  return '';
}


addUtilisateur(){
  console.log(this.email+""+this.nom+""+this.prenom+""+this.role+""+this.motDePasse+""+this.image)

  if(this.formGroup.valid){

    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(this.email)){
      console.log("Email invalide");
      this.successSnackBar = this.snackBar.open("Email invalide","", {
        duration: 2000,
      });
      this.router.navigate(["/addUtilisateur"]);
      
    }

    this.utilisateurService.register(this.nom,this.prenom,this.email,this.role,this.motDePasse,this.image).subscribe(data => {
      
      if(data){
        console.log(data);
       
        this.router.navigate(["/utilisateur"],{replaceUrl:true});
        this.successSnackBar = this.snackBar.open("L'utilisateur a été créé" ,"", {
          duration: 2000,
        });
      }
           
      }, error => {
        
        console.log(error.error.message);
        this.successSnackBar = this.snackBar.open(error.error.message,"", {
          duration: 2000,
        });
        this.router.navigate(["/addUtilisateur"]);
      }); 

  }
 

    

  
   
}



}

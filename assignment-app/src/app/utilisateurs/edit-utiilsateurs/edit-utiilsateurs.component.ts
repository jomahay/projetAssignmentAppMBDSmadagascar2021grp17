import { Role } from './../../shared/Role';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/shared/auth.service';

import { Utilisateur } from 'src/app/shared/utilisateur.model';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';
@Component({
  selector: 'app-edit-utiilsateurs',
  templateUrl: './edit-utiilsateurs.component.html',
  styleUrls: ['./edit-utiilsateurs.component.css']
})
export class EditUtiilsateursComponent implements OnInit {

  id:string;
  formGroup: FormGroup ;
  nom:string;
  prenom:string;
  email:string;
  role:string;
  motDePasse:string;
  image:string;
  imageAInserer:string='';
  rolesAafficher=Object.values(Role);
  successSnackBar:MatSnackBarRef<TextOnlySnackBar>;
 
  

  constructor(private route: ActivatedRoute,private authService:AuthService,private router: Router,private utilisateurService:UtilisateurService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
   
    this.utilisateurService.getUser(this.id).subscribe(utilisateur=>{
      console.log(utilisateur);
      this.nom=utilisateur.nom;
      this.prenom=utilisateur.prenom;
      this.email=utilisateur.email;
      this.role=utilisateur.role;
      this.motDePasse=utilisateur.hash_motDePasse;
      this.image=utilisateur.image;
    });
    this.formGroup= new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      motDePasse: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      imageAInserer:new FormControl('', )
    });
   
  }
updateUtilisateur(){

  console.log("id="+this.id+"nom= "+this.nom+"prenom= "+this.prenom+
  "email="+this.email+"role="+this.role+" motDePasse="+this.motDePasse+" imageAInserer="+this.formGroup.value.imageAInserer);
 if(this.formGroup.value.imageAInserer!=''){
  
    console.log("exemple image andrana "+this.formGroup.value.imageAInserer+" image à inserer");
    this.imageAInserer=this.formGroup.value.imageAInserer;
    this.utilisateurService.updateUtilisateur(this.id,this.nom,this.prenom,this.email,this.role,this.motDePasse,this.imageAInserer).subscribe(data=>{
     // console.log(data.message);
     if(this.role===Role.ADMIN){
      this.authService.logOut();
      this.router.navigate(["/login"],{replaceUrl:true});
      this.successSnackBar = this.snackBar.open("veuillez vous reconnecter pour effectuer les changements" ,"", {
        duration: 2000,
      });
      }else{
        
        this.successSnackBar = this.snackBar.open("modification éffectué" ,"", {
          duration: 2000,
        });
        this.router.navigate(["/utilisateur"],{replaceUrl:true});
      }
     
      
      
    },error => {

      console.log(error.error.message);
        this.successSnackBar = this.snackBar.open(error.error.message,"", {
          duration: 2000,
        });
        this.router.navigate(["/utilisateur/"+this.id+"/edit"]);
    });
  }else{
    console.log(this.image+"je veux pas  image à inserer")
    this.utilisateurService.updateUtilisateur(this.id,this.nom,this.prenom,this.email,this.role,this.motDePasse,this.image).subscribe(data=>{
      //console.log(data.message);
      if(this.role===Role.ADMIN){
        this.authService.logOut();
        this.router.navigate(["/login"],{replaceUrl:true});
        this.successSnackBar = this.snackBar.open("veuillez vous reconnecter pour effectuer les changements" ,"", {
          duration: 2000,
        });
      }else{
        
        this.successSnackBar = this.snackBar.open("modification éffectué" ,"", {
          duration: 2000,
        });
        this.router.navigate(["/utilisateur"],{replaceUrl:true});
      }
     
    },error => {

      console.log(error.error.message);
        this.successSnackBar = this.snackBar.open(error.error.message,"", {
          duration: 2000,
        });
        this.router.navigate(["/utilisateur/"+this.id+"/edit"]);
    });
 
  
} 
}


}

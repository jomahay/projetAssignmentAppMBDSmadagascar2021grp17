import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/shared/utilisateur.model';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';
import { MatieresService } from '../matieres.service';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import { Matiere } from '../matiere.model';
import { Role } from 'src/app/shared/Role';


@Component({
  selector: 'app-edit-matieres',
  templateUrl: './edit-matieres.component.html',
  styleUrls: ['./edit-matieres.component.css']
})
export class EditMatieresComponent implements OnInit {
  id: string;

  nom:string='';
  prof:string='';
  image:string='';
  profChange:string='';
  idProfSelectionne:string='';
  imageAInserer:string='';

  professeurs:Utilisateur[];
  
  successSnackBar:MatSnackBarRef<TextOnlySnackBar>;

  constructor(private route: ActivatedRoute,private router: Router,private utilisateurService:UtilisateurService ,private matieresService:MatieresService,private snackBar:MatSnackBar) {

   }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.matieresService.getMatiere(this.id).subscribe(matiere=>{
        
       this.nom=matiere[0].nom;
       this.prof=matiere[0].prof.nom+" "+matiere[0].prof.prenom;
       this.image=matiere[0].image;
       this.idProfSelectionne=matiere[0].prof._id;

       
       
    });

    this.getProfesseur();
  }

  
updateMatiere() {

  console.log("id="+this.id+"image="+this.image+" prof ="+this.prof+" nom matiere ="+this.nom+
  " imageChange ="+this.imageAInserer+"profChange ="+this.profChange+ " id prof ancien="+this.idProfSelectionne)

  //imageAInserer et prof sont Changés 
  if(this.imageAInserer!='' && this.profChange!=''){

    console.log("imageAInserer et prof sont Changés ");
    this.matieresService.updateMatiere(this.id,this.nom,this.profChange,this.imageAInserer).subscribe(data=>{
      
      this.successSnackBar = this.snackBar.open(data.message ,"", {
        duration: 2000,
      });
      this.router.navigate(["/matiere"]);
    });
  }//imageAInserer changé mais prof pas Changés 
  else if(this.imageAInserer!='' && this.profChange==''){

    console.log("imageAInserer changé mais prof pas Changés ");
    this.matieresService.updateMatiere(this.id,this.nom,this.idProfSelectionne,this.imageAInserer).subscribe(data=>{
     
      this.successSnackBar = this.snackBar.open("modification éffectué" ,"", {
        duration: 2000,
      });
      this.router.navigate(["/matiere"]);
    });
  }//imageAInserer PAS CHANGE mais prof changé
  else if(this.imageAInserer=='' && this.profChange!=''){
    console.log("imageAInserer PAS CHANGE mais prof changé");
    this.matieresService.updateMatiere(this.id,this.nom,this.profChange,this.image).subscribe(data=>{
     
      this.successSnackBar = this.snackBar.open(data.message ,"", {
        duration: 2000,
      });
      this.router.navigate(["/matiere"]);
    });
  }
  //imageAInserer PAS CHANGE ET prof PAS changé
  else{
    console.log("imageAInserer PAS CHANGE ET prof PAS changé");
    this.matieresService.updateMatiere(this.id,this.nom,this.idProfSelectionne,this.image).subscribe(data=>{
     
      this.successSnackBar = this.snackBar.open(data.message ,"", {
        duration: 2000,
      });
      this.router.navigate(["/matiere"]);
    });

  }
 
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

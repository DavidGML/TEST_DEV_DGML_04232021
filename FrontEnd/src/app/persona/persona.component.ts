import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Response } from '../models/response';
import { ApiService } from '../service/api.service';
import { Persona } from '../models/persona';
import { PersonaModalComponent } from '../dialogs/persona-modal/persona-modal.component';
import { DeleteModalComponent } from '../dialogs/delete-modal/delete-modal.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  public lst: any[];
  public colms: string[] = ['idPersonaFisica','nombre','apellidoPaterno','apellidoMaterno','rfc',
                            'fechaNacimiento','fechaRegistro','Opciones'];

  constructor(
    private api: ApiService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  getPersona() {
    this.api.getPersona().subscribe( response => {
      this.lst = response.data;
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open( PersonaModalComponent );
    dialogRef.afterClosed().subscribe( result => {
      this.getPersona();
    });
  }

  openEditModal(persona: Persona) {
    const dialogRef = this.dialog.open( PersonaModalComponent, {
      data: persona
      }
    );
    dialogRef.afterClosed().subscribe( result => {
      this.getPersona();
    });
  }

  openDeleteModal(persona: Persona){
    const dialogRef = this.dialog.open( DeleteModalComponent, {
    });
    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.api.deletePersona(persona.idPersonaFisica).subscribe(response =>{
          if(response.success){
            this.snackBar.open('Registro Eliminado!', '', {
              duration: 3000
            });
              this.getPersona();
          }
        });
      }
    });
  }
}

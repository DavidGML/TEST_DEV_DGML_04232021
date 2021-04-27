import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/service/api.service';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-persona-modal',
  templateUrl: './persona-modal.component.html',
  styleUrls: ['./persona-modal.component.css']
})
export class PersonaModalComponent implements OnInit {

  public idPersonaFisica?: number;
  public nombre: string;
  public apellidoPaterno: string;
  public apellidoMaterno: string;
  public rfc: string;
  public fechaNacimiento?: Date;
  public fechaRegistro?: Date;

  constructor(
    public dialogRef: MatDialogRef<PersonaModalComponent>,
    public api: ApiService,
    public snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public persona: Persona
  ) {
    if(this.persona != null) {
      this.nombre = persona.nombre,
      this.apellidoPaterno = persona.apellidoPaterno,
      this.apellidoMaterno = persona.apellidoMaterno,
      this.rfc = persona.rfc,
      this.fechaNacimiento = persona.fechaNacimiento,
      this.fechaRegistro = persona.fechaRegistro
    }
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  addPersona(){
    const persona: Persona = {
      nombre: this.nombre, apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno:this.apellidoMaterno, rfc: this.rfc,
      fechaNacimiento:this.fechaNacimiento, fechaRegistro: this.fechaRegistro
    };

    this.api.addPersona(persona).subscribe(response => {
      if(response.success){
        this.dialogRef.close();
        this.snackBar.open('¡Registro Guardado exitosamente!', '', {
          duration: 3000
        });
      }
    });
  }

  editPersona(){
    const persona: Persona = {
      idPersonaFisica: this.idPersonaFisica, nombre: this.nombre, apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno:this.apellidoMaterno, rfc: this.rfc,
      fechaNacimiento:this.fechaNacimiento, fechaRegistro: this.fechaRegistro
    };

    this.api.editPersona(persona).subscribe(response => {
      if(response.success){
        this.dialogRef.close();
        this.snackBar.open('¡Cambios realizados exitosamente!', '', {
          duration: 3000
        });
      }
    });
  }
}

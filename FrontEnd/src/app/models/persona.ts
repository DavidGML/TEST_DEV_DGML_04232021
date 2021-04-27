export interface Persona {
  idPersonaFisica?: number;
  fechaRegistro?: Date;
  fechaActualizacion?: Date;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rfc: string;
  fechaNacimiento?: Date;
  usuarioAgrega?: number;
  activo?: boolean;
}


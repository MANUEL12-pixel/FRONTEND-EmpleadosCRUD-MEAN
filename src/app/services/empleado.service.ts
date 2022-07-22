import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { keys } from 'src/environments/keys';
import { Empleados } from '../models/empleados';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  //obtenemos todos los empleados
  getEmpleados() {
    return this.http.get(keys.urlBackend + keys.table.empleados);
  }

  //obtenemos un empleado
  getEmpleado(id: number | number) {
    return this.http.get(keys.urlBackend + keys.table.empleados + "/" + id);
  }

  //guardar empleado
  saveEmpleado(empleado: Empleados) {
    return this.http.post(keys.urlBackend + keys.table.empleados, empleado)
  }

  //eliminar empleado
  deleteEmpleado(id: number) {
    return this.http.delete(keys.urlBackend + keys.table.empleados + "/" + id);
  }

  //actualizar empleado
  updateEmpleado(id: number, updateEmpleado: Empleados) {
    return this.http.put(keys.urlBackend + keys.table.empleados + "/" + id, updateEmpleado)
  }
}

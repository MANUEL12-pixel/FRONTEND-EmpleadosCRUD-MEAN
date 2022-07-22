import { Component, OnInit, HostBinding } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleados } from 'src/app/models/empleados';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.css']
})
export class EmpleadosListComponent implements OnInit {

  @HostBinding('class') classes = 'row'

  empleados: any = [];

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  eliminarEmpleado(id: number) {
    this.empleadoService.deleteEmpleado(id).subscribe(
      res => {
        console.log(res);
        this.obtenerEmpleados();
      },
      err => console.error(err)
    )
  }

  obtenerEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      res => {
        this.empleados = res;
      },
      err => console.error(err)
    );
  }

}

import { Component, OnInit, HostBinding } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleados } from 'src/app/models/empleados';

@Component({
  selector: 'app-empleados-form',
  templateUrl: './empleados-form.component.html',
  styleUrls: ['./empleados-form.component.css']
})
export class EmpleadosFormComponent implements OnInit {

  saveEmpleadoForm: FormGroup;
  editEmpleadoForm: FormGroup;

  edit: boolean = false;

  empleado: Empleados = {
    id: 0,
    nombre: '',
    apellidos: '',
    matricula: '',
    salario: ''
  }

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    public fb: FormBuilder, private aRoute: ActivatedRoute) {

    this.saveEmpleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      matricula: ['', Validators.required],
      salario: ['', Validators.required],

    });


    this.editEmpleadoForm = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      matricula: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }



  ngOnInit(): void {
    const params = this.aRoute.snapshot.params;
    if (params['id']) {
      this.empleadoService.getEmpleado(params['id']).subscribe(
        res => {
          this.empleado = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }
  }



  agregarEmpleado() {
    this.empleadoService.saveEmpleado(this.saveEmpleadoForm.value).subscribe(data => {
      Swal.fire({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        title: `Empleado agregado con exito`,
        icon: 'success',
      });
      this.router.navigate(['/empleados']);
    }, error => {
      console.log(error);
      this.saveEmpleadoForm.reset();
    })
  }

  actualizarEmpleado() {
    this.empleadoService.updateEmpleado(this.empleado.id!, this.empleado).subscribe(
      res => {
        console.log(res)
        Swal.fire({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
          title: `Empleado modificado con exito`,
          icon: 'success',
        });
        this.router.navigate(['/empleados'])
      },
      err => console.log(err)
    )
  }

  deleteEmpleado() {
    let valor2 = this.editEmpleadoForm.controls['id'].value;

    this.empleadoService.deleteEmpleado(valor2).subscribe(data => {
      Swal.fire({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        title: `Empleado eliminado con exito`,
        icon: 'success',
      });
      this.router.navigate(['/empleados']);
    }, error => {
      console.log(error);
    })
  }

}



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    nombre: ['Carlos Capobianco', [Validators.required]],
    email:     ['cerdo@gmail.com', [Validators.required, Validators.email]],
    password:  ['123456', [Validators.required, Validators.minLength(6)]]
  });


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.miFormulario.value);

    const { email, name, password } = this.miFormulario.value;

    this.authService.registro( name, email, password ).subscribe(completed=>{
      if (completed === true) {
        this.router.navigateByUrl('/dashboard');        
      } else {
        Swal.fire('Error', 'No fue posible registrar al usuario', 'error');
      }
    })
  }

}

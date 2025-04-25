import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AddContactComponent} from '../../Components/add-contact/add-contact.component';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-contact-page.component.html',
  styleUrls: ['./add-contact-page.component.css']
})
export class AddContactPageComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const newContact = this.contactForm.value;
      // Ejemplo: this.contactService.add(newContact).subscribe(...);

      // Navegar a la ruta 'start'
      this.router.navigate(['/chat']);
    }
  }
}

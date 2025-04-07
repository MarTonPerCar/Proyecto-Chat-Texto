import {Component, ChangeDetectorRef, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-request',
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {
  @Input() label: string = '';         // Recibe el label
  @Input() placeholder: string = '';    // Recibe el placeholder
  @Input() pattern: string = '';       // Recibe el patrón para la validación
  @Input() value: string = '';    // Recibe el valor del campo

}

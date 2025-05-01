import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-request',
  imports: [
    FormsModule,
  ],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() pattern: string = '';
  @Input() value: string = '';

}

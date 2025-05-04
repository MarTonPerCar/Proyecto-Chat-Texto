import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  settingsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      language: ['es', Validators.required],
      theme: ['light', Validators.required],
      fontSize: [16, [Validators.required, Validators.min(12), Validators.max(24)]]
    });

    // Load saved settings
    const saved = localStorage.getItem('userSettings');
    if (saved) {
      try {
        this.settingsForm.patchValue(JSON.parse(saved));
      } catch {}
    }

    // Auto-save on change
    this.settingsForm.valueChanges.subscribe(val => {
      localStorage.setItem('userSettings', JSON.stringify(val));
    });
  }

  onSubmit(): void {
    if (this.settingsForm.invalid) {
      this.settingsForm.markAllAsTouched();
      return;
    }
    // Save and navigate back
    localStorage.setItem('userSettings', JSON.stringify(this.settingsForm.value));
    this.router.navigate(['/chat']);
  }
}

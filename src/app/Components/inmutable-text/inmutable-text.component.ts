import { Component } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Auth, signOut} from '@angular/fire/auth';
import { Router } from '@angular/router';


class UserData {
}

class FirestoreService {
}

@Component({
  selector: 'app-inmutable-text',
  imports: [],
  templateUrl: './inmutable-text.component.html',
  styleUrl: './inmutable-text.component.css'
})
export class InmutableTextComponent {
  userData$!: Observable<UserData | null>;

  constructor(
    private auth: Auth,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.auth.currentUser;
    if (user?.uid) {

    } else {
      this.userData$ = of(null);
    }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}

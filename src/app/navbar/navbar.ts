import { Component, effect, signal } from '@angular/core';
import { Token } from '../../services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isLogin = signal(false);
  constructor(private token: Token) {
    effect(() => {
      const token = this.token.tokenSignal();
      if (token) {
        this.isLogin.set(true);
      } else {
        this.isLogin.set(false);
      }
    });
  }
  logOut() {
    this.token.clearToken();
    Swal.fire({
      title: 'ออกจากระบบสำเร็จ✅',
      icon: 'success',
      draggable: true,
    });
  }
}

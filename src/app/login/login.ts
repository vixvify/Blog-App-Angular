import { Component, effect, signal } from '@angular/core';
import { User } from '../../types/User';
import { FormsModule } from '@angular/forms';
import { Userservice } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Token } from '../../services/token.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = signal<string>('');
  password = signal<string>('');
  canSend = signal(false);

  constructor(private userservice: Userservice, private router: Router, private token: Token) {
    effect(() => {
      if (this.username() === '' || this.password() === '') {
        this.canSend.set(false);
      } else {
        this.canSend.set(true);
      }
    });
  }

  sendUserData() {
    Swal.fire({
      title: 'กำลังดำเนินการ...',
      showConfirmButton: false,
    });
    const data: User = {
      username: String(this.username()),
      password: String(this.password()),
    };
    this.userservice.login(data).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.token.setToken();
        Swal.fire({
          title: 'เข้าสู่ระบบสำเร็จ✅',
          icon: 'success',
          draggable: true,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message,
        });
      },
    });
  }
}

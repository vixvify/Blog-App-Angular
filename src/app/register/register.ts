import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../types/User';
import { Userservice } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = signal<String>('');
  password = signal<String>('');
  confirmpassword = signal<String>('');
  canSend = signal(false);

  constructor(private userservice: Userservice, private router: Router) {
    effect(() => {
      if (this.username() === '' || this.password() === '' || this.confirmpassword() === '') {
        this.canSend.set(false);
      } else if (this.password() !== this.confirmpassword()) {
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
    const userData: User = {
      username: String(this.username()),
      password: String(this.password()),
    };
    this.userservice.createUserData(userData).subscribe({
      next: () => {
        Swal.fire({
          title: 'สร้างบัญชีสำเร็จ✅',
          icon: 'success',
          draggable: true,
        });
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('❌ Register failed:', err),
    });
  }
}

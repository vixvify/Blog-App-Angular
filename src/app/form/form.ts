import { Component, effect, signal } from '@angular/core';
import { Blog } from '../../types/Blog';
import { Token } from '../../services/token.service';
import { FormsModule } from '@angular/forms';
import { Blogservice } from '../../services/blog.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  name = signal('');
  content = signal('');
  author = signal('');
  canSend = signal(false);

  constructor(private token: Token, private blogservice: Blogservice, private router: Router) {
    effect(() => {
      if (this.name() === '' || this.content() === '' || this.author() === '') {
        this.canSend.set(false);
      } else {
        this.canSend.set(true);
      }
    });
  }

  sendData() {
    Swal.fire({
      title: 'กำลังดำเนินการ...',
      showConfirmButton: false,
    });
    const time = Date.now();
    const date = new Date(time);
    const strDate = date.toLocaleString();
    const blogData: Blog = {
      name: String(this.name()),
      content: String(this.content()),
      author: String(this.author()),
      date: strDate,
      authorId: this.token.tokenSignal().id,
    };
    this.blogservice.createBlogData(blogData).subscribe({
      next: () => {
        Swal.fire({
          title: 'โพสต์สำเร็จ✅',
          icon: 'success',
          draggable: true,
        });
        this.router.navigate(['/']);
      },
      error: (err) => console.error('❌ failed:', err),
    });
  }
}

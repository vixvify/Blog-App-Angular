import { Component, effect, signal } from '@angular/core';
import { Blog } from '../../types/Blog';
import { Token } from '../../services/token.service';
import { FormsModule } from '@angular/forms';
import { Blogservice } from '../../services/blog.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './editform.html',
  styleUrl: './editform.css',
})
export class Editform {
  name = signal('');
  content = signal('');
  author = signal('');
  date = signal('');
  canSend = signal(false);

  constructor(
    private token: Token,
    private blogservice: Blogservice,
    private router: Router,
    private route: ActivatedRoute
  ) {
    effect(() => {
      if (this.name() === '' || this.content() === '' || this.author() === '') {
        this.canSend.set(false);
      } else {
        this.canSend.set(true);
      }
    });
    effect(() => {
      this.getData();
    });
  }

  getData() {
    this.blogservice.getSingle(this.route.snapshot.paramMap.get('id')!).subscribe({
      next: (res: any) => {
        this.name.set(res.data.name);
        this.content.set(res.data.content);
        this.author.set(res.data.author);
        this.date.set(res.data.date);
      },
      error: (err) => console.error('❌ เกิดข้อผิดพลาด', err),
    });
  }

  sendData() {
    Swal.fire({
      title: 'กำลังดำเนินการ...',
      showConfirmButton: false,
    });
    const blogData: Blog = {
      name: String(this.name()),
      content: String(this.content()),
      author: String(this.author()),
      date: String(this.date()),
      authorId: this.token.tokenSignal().id,
    };
    this.blogservice.updateData(this.route.snapshot.paramMap.get('id')!, blogData).subscribe({
      next: () => {
        Swal.fire({
          title: 'แก้ไขโพสต์สำเร็จ✅',
          icon: 'success',
          draggable: true,
        });
        this.router.navigate(['/']);
      },
      error: (err) => console.error('❌ failed:', err),
    });
  }
}

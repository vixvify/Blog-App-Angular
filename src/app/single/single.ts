import { Component, signal, effect } from '@angular/core';
import { Blogservice } from '../../services/blog.service';
import { Blog } from '../../types/Blog';
import { ActivatedRoute } from '@angular/router';
import { Token } from '../../services/token.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single',
  imports: [],
  templateUrl: './single.html',
  styleUrl: './single.css',
})
export class Single {
  data = signal<Blog | undefined>(undefined);
  id = signal(this.token.tokenSignal()?.id);
  constructor(
    private blogservice: Blogservice,
    private route: ActivatedRoute,
    private token: Token,
    private router: Router
  ) {
    effect(() => {
      this.blogservice.getSingle(this.route.snapshot.paramMap.get('id')!).subscribe({
        next: (res: any) => {
          this.data.set(res.data);
        },
        error: (err) => console.error('❌ เกิดข้อผิดพลาด', err),
      });
    });
  }
  confirmDel(id: string) {
    Swal.fire({
      title: 'ต้องการลบโพสต์หรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบโพสต์',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delData(id);
      }
    });
  }

  delData(id: string) {
    this.blogservice.delData(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'ลบโพสต์สำเร็จ✅',
          icon: 'success',
          draggable: true,
        });
        this.router.navigate(['/']);
      },
      error: (err) => console.error('❌ เกิดข้อผิดพลาด', err),
    });
  }

  editData(id: string) {
    this.router.navigate([`/editform/${id}`]);
  }
}

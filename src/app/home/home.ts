import { Component, effect, signal } from '@angular/core';
import { Blogservice } from '../../services/blog.service';
import { Token } from '../../services/token.service';
import { Blog } from '../../types/Blog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { KeywordService } from '../../services/keyword.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(
    private blogservice: Blogservice,
    private token: Token,
    private router: Router,
    private keywordservice: KeywordService
  ) {
    effect(() => {
      this.id.set(this.token.tokenSignal()?.id);
      this.keyword.set(this.keywordservice.sharedKeyword());
      this.getData();
    });
  }
  data = signal<Blog[]>([]);
  id = signal(this.token.tokenSignal()?.id);
  keyword = signal(this.keywordservice.sharedKeyword());

  getData() {
    this.blogservice.getData(this.keyword()).subscribe({
      next: (latestData) => {
        this.data.set(latestData.blogData);
      },
      error: (err) => console.error('❌ เกิดข้อผิดพลาด', err),
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
        this.getData();
      },
      error: (err) => console.error('❌ เกิดข้อผิดพลาด', err),
    });
  }

  editData(id: string) {
    this.router.navigate([`/editform/${id}`]);
  }
}

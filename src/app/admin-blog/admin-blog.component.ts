import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog } from '../shared/interfaces/blog';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {

  blog: Blog = {title: '', text: '', author: '', avatar: 'http://localhost:4200/assets/christmas.jpg'};
  isEdit: boolean = false;
  editId: number;
  blogs: Blog[];

  constructor(private blogServise: BlogService) {
    this.getBlogs();
  }
  ngOnInit(): void {
  }
  getBlogs(): void {
    this.blogServise.getBlogs().subscribe(
      (data: Blog[]) => this.blogs = data,
      (err: Error)=>console.log(err)
    )
  }
  add(): void {
    if (this.blog.title !== '' && this.blog.text !== '' && this.blog.author !== '') {
      this.blogServise.postBlog(this.blog).subscribe(
        () => {
          this.blog = {title: '', text: '', author: '', avatar: 'http://localhost:4200/assets/christmas.jpg'}
          this.getBlogs();
        },
        (err: Error)=>console.log(err)
      );
    }
  }
  edit(blog: Blog): void {
    this.isEdit = true;
    this.blog = { ...blog }
    this.editId = blog.id;
    delete (this.blog.id);
  }
  saveEdit(): void {
    if (this.blog.title !== '' && this.blog.text !== '' && this.blog.author !== '') {
      this.blogServise.patchBlog(this.editId, this.blog).subscribe(
        () => {
          this.blog = {title: '', text: '', author: '', avatar: 'http://localhost:4200/assets/christmas.jpg'};
          this.isEdit = false;
          this.getBlogs();
        },
        (err: Error)=>console.log(err)
      );
    }
  }
  delete(i: number): void {
    this.blogServise.delBlog(i).subscribe(
      () => this.getBlogs(),
      (err: Error)=>console.log(err)
    );
  }
  


}

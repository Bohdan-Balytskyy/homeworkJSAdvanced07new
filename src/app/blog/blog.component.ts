import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog } from '../shared/interfaces/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogs: Blog[];

  constructor(private blogServise: BlogService) {
    this.blogServise.getBlogs().subscribe(
      (data: Blog[]) => this.blogs = data,
      (err: Error)=>console.log(err)
    )
   }

  ngOnInit(): void {
  }

}

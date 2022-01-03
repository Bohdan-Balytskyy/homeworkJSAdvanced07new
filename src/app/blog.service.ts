
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blog } from './shared/interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url: string = environment.BACKEND_URL;
  private api = {
    blogs: `${this.url}/blogs`
  }
  constructor(private http: HttpClient) { }
  
  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.api.blogs);
  }
  getBlog(i:number): Observable<Blog> {
    return this.http.get<Blog>(`${this.api.blogs}/${i}`);
  }
  postBlog(body: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.api.blogs, body);
  }
  delBlog(i: number): Observable<void>{
    return this.http.delete<void>(`${this.api.blogs}/${i}`)
  }
  patchBlog(i:number, body:Blog): Observable<Blog> {
    return this.http.patch<Blog>(`${this.api.blogs}/${i}`, body);
  }
}

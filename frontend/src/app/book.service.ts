import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getTop3Books() {
    return this.http.get(`${this.uri}/books/getTop3Books`);
  }

  getBookOfTheDay() {
    return this.http.get(`${this.uri}/books/getBookOfTheDay`);
  }

  getBookImage(title) {
    const data = {
      title: title
    }
    return this.http.post(`${this.uri}/books/getBookImage`, data, { responseType: 'blob' });
  }

  searchBooks(searchParam) {
    const data = {
      searchParam: searchParam
    }
    return this.http.post(`${this.uri}/books/searchBooks`, data);
  }

  rentBook(book, username) {
    const data = {
      book: book,
      username: username
    }
    return this.http.post(`${this.uri}/users/rentBook`, data);
  }

}

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

  getBookImage(id: number) {
    const data = {
      id: id
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
    return this.http.post(`${this.uri}/books/rentBook`, data);
  }

  getBook(id: number) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/books/getBook`, data);
  }

  addBook(title, authors, genre, publisher, publishYear, language, available, image) {
    
    const formData = new FormData();
    formData.append('data', title);
    formData.append('data', authors);
    formData.append('data', genre);
    formData.append('data', publisher);
    formData.append('data', publishYear);
    formData.append('data', language);
    formData.append('data', available);
    formData.append('file', image);

    return this.http.post(`${this.uri}/books/addBook`, formData);
  }

  updateBookAndImage(id, title, authors, genre, publisher, publishYear, language, available, image) {
    const formData = new FormData();
    formData.append('data', id);
    formData.append('data', title);
    formData.append('data', authors);
    formData.append('data', genre);
    formData.append('data', publisher);
    formData.append('data', publishYear);
    formData.append('data', language);
    formData.append('data', available);
    formData.append('file', image);

    return this.http.post(`${this.uri}/books/updateBookAndImage`, formData);
  }

  updateBookAndNotImage(id, title, authors, genre, publisher, publishYear, language, available) {
    const data = {
      id: id,
      title: title,
      authors: authors,
      genre: genre,
      publisher: publisher,
      publishYear: publishYear,
      language: language,
      available: available
    }

    return this.http.post(`${this.uri}/books/updateBookAndNotImage`, data);

  }

  getAllBooks() {
    return this.http.get(`${this.uri}/books/getAllBooks`);
  }

  deleteBook(id: number) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/books/deleteBook`, data);
  }

  addBookRequest(username, title, authors, genre, publisher, publishYear, language, image) {

    const formData = new FormData();
    formData.append('data', username);
    formData.append('data', title);
    formData.append('data', authors);
    formData.append('data', genre);
    formData.append('data', publisher);
    formData.append('data', publishYear);
    formData.append('data', language);
    formData.append('file', image);

    return this.http.post(`${this.uri}/books/addBookRequest`, formData);
  }

  getAllBookRequests() {
    return this.http.get(`${this.uri}/books/getAllBookRequests`);
  }

  getRequestImage(id: number) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/books/getRequestImage`, data, { responseType: 'blob' });
  }

  acceptBookRequest(id: number) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/books/acceptBookRequest`, data);
  }

  rejectBookRequest(id: number) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/books/rejectBookRequest`, data);
  }

  returnBook(username, id) {
    const data = {
      username: username,
      id: id
    }
    return this.http.post(`${this.uri}/books/returnBook`, data);
  }

}

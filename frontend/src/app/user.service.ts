import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';  

  login(usernameForm, passwordForm) {
    const data = {
      username: usernameForm,
      password: passwordForm
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  adminLogin(usernameForm, passwordForm) {
    const data = {
      username: usernameForm,
      password: passwordForm
    }

    return this.http.post(`${this.uri}/users/adminLogin`, data);
  }

  register(usernameForm, passwordForm, firstnameForm, lastnameForm, addressForm, telForm, emailForm, imageForm) {
    const data = {
      username: usernameForm,
      password: passwordForm, 
      firstname: firstnameForm,
      lastname: lastnameForm,
      address: addressForm,
      tel: telForm,
      email: emailForm,
      image: imageForm
    }

    const formData = new FormData();
  
    formData.append('data', usernameForm);
    formData.append('data', passwordForm);
    formData.append('data', firstnameForm);
    formData.append('data', lastnameForm);
    formData.append('data', addressForm);
    formData.append('data', telForm);
    formData.append('data', emailForm);
    formData.append('file', imageForm);

    return this.http.post(`${this.uri}/users/register`, formData);
  }

  changePassword(username, oldPassword, newPassword) {
    const data = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    return this.http.post(`${this.uri}/users/changePassword`, data);
  }

  getUserImage(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/getUserImage`, data, { responseType: 'blob' });
  }

  getMyRentals(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/getMyRentals`, data);
  }

  checkUserRentals(username, title) {
    const data = {
      username: username,
      title: title
    }
    return this.http.post(`${this.uri}/users/checkUserRentals`, data);
  }
  
  getRentingHistory(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/getRentingHistory`, data);
  }

  getAllUsers() {
    return this.http.get(`${this.uri}/users/getAllUsers`);
  }

  deleteUser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/deleteUser`, data);
  }

}

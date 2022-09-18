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

  getRequestImage(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/getRequestImage`, data, { responseType: 'blob' });
  }

  getMyRentals(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/getMyRentals`, data);
  }

  checkUserRentals(username, id) {
    const data = {
      username: username,
      id: id
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

  addUser(usernameForm, passwordForm, firstnameForm, lastnameForm, addressForm, telForm, emailForm, imageForm) {
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

    return this.http.post(`${this.uri}/users/addUser`, formData);
  }

  updateUserAndImage  (oldUsername, usernameForm, passwordForm, firstnameForm, lastnameForm, addressForm, telForm, emailForm, imageForm) {
    const formData = new FormData();
    
    formData.append('data', oldUsername);
    formData.append('data', usernameForm);
    formData.append('data', passwordForm);
    formData.append('data', firstnameForm);
    formData.append('data', lastnameForm);
    formData.append('data', addressForm);
    formData.append('data', telForm);
    formData.append('data', emailForm);
    formData.append('file', imageForm);

    return this.http.post(`${this.uri}/users/updateUserAndImage`, formData);
  }

  updateUserAndNotImage(oldUsername, usernameForm, passwordForm, firstnameForm, lastnameForm, addressForm, telForm, emailForm) {
    const data = {
      oldUsername: oldUsername,
      username: usernameForm,
      password: passwordForm, 
      firstname: firstnameForm,
      lastname: lastnameForm,
      address: addressForm,
      tel: telForm,
      email: emailForm
    }

    return this.http.post(`${this.uri}/users/updateUserAndNotImage`, data);
  }

  getAllRegistrationRequests() {
    return this.http.get(`${this.uri}/users/getAllRegistrationRequests`);
  }

  acceptRequst(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/acceptRequest`, data);
  }

  rejectRequest(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/rejectRequest`, data);
  }

  promoteUser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/promoteUser`, data);
  }

  demoteUser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/demoteUser`, data);
  }

  blockUser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/blockUser`, data);
  }

  unblockUser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/unblockUser`, data);
  }

  updateDeadline(username, deadline) {
    const data = {
      username: username,
      deadline: deadline
    }

    return this.http.post(`${this.uri}/users/updateDeadline`, data);
  }

  getUserNotifications(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/getUserNotifications`, data);
  }

  getNumberOfReadBooksInLastYear(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/getNumberOfReadBooksInLastYear`, data);
  }

  getNumberOfReadBooksByGenre(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/getNumberOfReadBooksByGenre`, data);
  }
}

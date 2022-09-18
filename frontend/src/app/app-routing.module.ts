import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminComponent } from './admin/admin.component';
import { BookRequestComponent } from './book-request/book-request.component';
import { BookRequestsComponent } from './book-requests/book-requests.component';
import { BookComponent } from './book/book.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ProfileComponent } from './profile/profile.component';
import { RegRequestsComponent } from './reg-requests/reg-requests.component';
import { RegisterComponent } from './register/register.component';
import { RentedBooksComponent } from './rented-books/rented-books.component';
import { RentingHistoryComponent } from './renting-history/renting-history.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "user", component: UserComponent},
  {path: "adminLogin", component: AdminLoginComponent},
  {path: "admin", component: AdminComponent},
  {path: "changePassword", component: ChangePasswordComponent},
  {path: "mainMenu", component: MainMenuComponent},
  {path: "profile", component: ProfileComponent},
  {path: "book", component: BookComponent},
  {path: "rentedBooks", component: RentedBooksComponent},
  {path: "rentingHistory", component: RentingHistoryComponent},
  {path: "addBook", component: AddBookComponent},
  {path: "adminUsers", component: AdminUsersComponent},
  {path: "adminBooks", component: AdminBooksComponent},
  {path: "addUser", component: AddUserComponent},
  {path: "updateUser", component: UpdateUserComponent},
  {path: "regRequests", component: RegRequestsComponent},
  {path: "bookRequest", component: BookRequestComponent},
  {path: "bookRequests", component: BookRequestsComponent},
  {path: "updateProfile", component: UpdateProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

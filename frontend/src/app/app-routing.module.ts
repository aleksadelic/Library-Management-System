import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AdminComponent } from './admin/admin.component';
import { BookComponent } from './book/book.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RentedBooksComponent } from './rented-books/rented-books.component';
import { RentingHistoryComponent } from './renting-history/renting-history.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "user", component: UserComponent},
  {path: "admin", component: AdminComponent},
  {path: "changePassword", component: ChangePasswordComponent},
  {path: "mainMenu", component: MainMenuComponent},
  {path: "profile", component: ProfileComponent},
  {path: "book", component: BookComponent},
  {path: "rentedBooks", component: RentedBooksComponent},
  {path: "rentingHistory", component: RentingHistoryComponent},
  {path: "addBook", component: AddBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

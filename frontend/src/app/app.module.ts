import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ProfileComponent } from './profile/profile.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { BookComponent } from './book/book.component';
import { CommentComponent } from './comment/comment.component';
import { RentedBooksComponent } from './rented-books/rented-books.component';
import { RentedBookCardComponent } from './rented-book-card/rented-book-card.component';
import { RentingHistoryComponent } from './renting-history/renting-history.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ModeratorComponent,
    UserComponent,
    RegisterComponent,
    HomepageComponent,
    ChangePasswordComponent,
    MainMenuComponent,
    ProfileComponent,
    BookdetailsComponent,
    BookComponent,
    CommentComponent,
    RentedBooksComponent,
    RentedBookCardComponent,
    RentingHistoryComponent,
    AddBookComponent,
    AdminLoginComponent,
    AdminUsersComponent,
    UserdetailsComponent,
    AdminBooksComponent,
    AddUserComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

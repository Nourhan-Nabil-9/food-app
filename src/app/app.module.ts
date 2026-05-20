import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GlobalInterceptor } from './core/interceptors/global.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './shared/home/home.component';
import { RecipesModule } from './admin/recipes/recipes.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DeleteComponent } from './shared/delete/delete.component';
import { ViewComponent } from './shared/view/view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [AppComponent, HomeComponent, DeleteComponent, ViewComponent],
  imports: [
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RecipesModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
    }),
    NavbarComponent,
    SidebarComponent,
    NgxDropzoneModule,
    MatDialogModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

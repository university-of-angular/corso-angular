import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { CourseImageComponent } from './components/course-image/course-image.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseCardComponent,
    CourseImageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

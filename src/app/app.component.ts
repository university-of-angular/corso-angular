import { Component, ViewChild } from '@angular/core';
import { COURSES } from '../db-data';
import { Course } from './components/course-card/model/course';
import { CourseCardComponent } from './components/course-card/course-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses = COURSES;

  // The variable 'card' will be populate with a reference of the CourseCardComponent instance
  @ViewChild(CourseCardComponent)
  card: CourseCardComponent;

  onCourseSelected(course: Course) {
    console.log(this.card);
  }
}

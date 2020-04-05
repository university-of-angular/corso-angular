import { Component } from '@angular/core';
import { COURSES } from '../db-data';
import { Course } from './components/course-card/model/course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Core Deep Dive';
  courses = COURSES;

  onCourseSelected(course: Course) {
    console.log('App component - click event bubbled...', course);
  }
}

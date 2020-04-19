import { Component, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('cardRef1', { read: ElementRef })
  card1: ElementRef;

  @ViewChild('cardRef2')
  card2: CourseCardComponent;

  @ViewChild('container')
  containerDiv: ElementRef;

  onCourseSelected(course: Course) {
    console.log('Card 1: ', this.card1);
    console.log('Container: ', this.containerDiv);
  }
}

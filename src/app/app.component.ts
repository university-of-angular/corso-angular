import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { COURSES } from '../db-data';
import { Course } from './components/course-card/model/course';
import { CourseCardComponent } from './components/course-card/course-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  courses = COURSES;

  @ViewChild('cardRef1', { read: ElementRef })
  card1: ElementRef;

  @ViewChild('cardRef2')
  card2: CourseCardComponent;

  @ViewChild('courseImage')
  courseImage: ElementRef;

  constructor() {

  }

  // This is the right place to put some initialization logic that needs to access
  // for instance, the @ViewChild and @ViewChildren elements.
  ngAfterViewInit(): void {
    console.log('courseImage: ', this.courseImage);
  }

  onCourseSelected(course: Course) {

  }
}

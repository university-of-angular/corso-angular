import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, AfterViewInit, ContentChild } from '@angular/core';
import { Course } from './model/course';
import { CourseImageComponent } from '../course-image/course-image.component';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CourseCardComponent implements OnInit, AfterViewInit {

  @Input()
  course: Course;

  @Input()
  cardIndex: number;

  @Output()
  courseSelected = new EventEmitter<Course>();

  @ContentChild(CourseImageComponent)
  image: CourseImageComponent;

  constructor() { }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.image);
  }

  onCourseViewed() {
    this.courseSelected.emit(this.course);
  }

  isImageVisible() {
    return this.course && this.course.iconUrl;
  }

  cardClasses() {
    if (this.course.category === 'BEGINNER') {
      return ['beginner'];
    }
  }

  cardStyles() {
    return {'background-image': 'url(' + this.course.iconUrl + ')'};
  }
}

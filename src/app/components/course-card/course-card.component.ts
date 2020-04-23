import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, AfterViewInit, ContentChild, ContentChildren, QueryList, AfterContentInit, ElementRef, TemplateRef } from '@angular/core';
import { Course } from './model/course';
import { CourseImageComponent } from '../course-image/course-image.component';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CourseCardComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Input()
  course: Course;

  @Input()
  cardIndex: number;

  @Input()
  noImageTpl: TemplateRef<any>;

  @Output()
  courseSelected = new EventEmitter<Course>();

  @ContentChildren(CourseImageComponent, { read: ElementRef })
  images: QueryList<ElementRef>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngAfterContentInit(): void {
    console.log(this.images);
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

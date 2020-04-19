import { Component, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
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

  @ViewChildren(CourseCardComponent, { read: ElementRef })
  cards: QueryList<ElementRef>;

  constructor() {

  }

  ngAfterViewInit(): void {
    // this.cards.changes.subscribe(
    //   cards => console.log(cards)
    // );

    console.log('cards: ', this.cards);
  }

  onCourseSelected(course: Course) {

  }

  onCoursrsEdited() {
    this.courses.push({
      id: 1,
      description: "Angular Core Deep Dive",
      longDescription: "A detailed walk-through of the most important part of Angular - the Core and Common modules",
      lessonsCount: 10
  });
  }
}

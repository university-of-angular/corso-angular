import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-image',
  templateUrl: './course-image.component.html',
  styles: []
})
export class CourseImageComponent implements OnInit {

  @Input('src')
  imageUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

}

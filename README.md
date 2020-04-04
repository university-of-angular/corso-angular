# @Output() decorator - Send information from the child components to the parent component

# Child component
1) On the child component declare an EventEmitter instance decorated with @Output()

2) Create a method that will use the EventEmitter instance to emit an event that will
   be bubbled by the parent component.
   
3) In the child component's template on the (click) event call the method of step 2.

# Parent component
1) In the parent component's template declare:
   (ChildComponent_EventEmitter_instance) = "ParentComponentEventBubbledFunction($event)"

2) In the parent component create the 'ParentComponentEventBubbledFunction($event)'.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

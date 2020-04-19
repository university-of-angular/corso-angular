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

# ngStyle core directive
* When to use it?
  To apply several styles to a component.
  #### Ej:
  ```
  [ngStyle]="{'text-decoration': 'underline'}"
  ```

  We can pass it a function defined in our component too:
  #### Ej:
  ```
  [ngStyle]="cardStyles()"

  ....
  cardStyles() {
    return {'text-decoration': 'underline'};
  }
  ```

* Why to use it?
  When the style properties to set depends on dynamic component values.

# ng-container core directive
Is an element that can act as the host to structural directives.
 #### Ej:
 ``` 
 <div *ngIf="todos">
  <div *ngFor="let todo of todos">
    {{ todo.content }}
  </div>
</div>
 ```
 This is all well and good, but it adds a useless div element to the DOM. Using **ng-container** we can
 obtain the same result, but without adding any extra element to the DOM at runtime:
 #### Ej:
 ``` 
 <ng-container *ngIf="todos">
  <div *ngFor="let todo of todos">
    {{ todo.content }}
  </div>
</ng-container>
```
And this is also really useful when using ngIf on inline content to avoid the need for a bunch of span elements. This…
``` 
<div>
  <span *ngIf="error">Oops:</span> {{ message }}
</div>
```
…can also be used like this:
``` 
<div>
  <ng-container *ngIf="error">Oops:</ng-container> {{ message }}
</div>
```

# Template querying
@ViewChild and @ViewChildren are decorators that allow us to perform queries in the components templates.

## @ViewChild decorator
Want to get access to a child component, directive or a DOM element from a parent component class?  It’s easy to do with the **ViewChild** decorator.
**ViewChild** returns the first element that matches a given component, directive or template reference selector. In cases where you’d want to access multiple children, you’d use **ViewChildren** instead.

* Directives
  Let’s say we have a BaconDirective like this:
  ``` 
  import { Directive, ElementRef, Renderer2 } from '@angular/core';

  @Directive({ selector: '[appBacon]' })
  export class BaconDirective {
    ingredient = 'mayo';

    constructor(elem: ElementRef, renderer: Renderer2) {
      let bacon = renderer.createText('🥓🥓🥓 ');
      renderer.appendChild(elem.nativeElement, bacon);
    }
  }
  ```
And we use it in our component template like this:
``` 
<span appBacon>sandwich!</span>
```
We can now access the directive with **ViewChild** using something like the following snippet in our component class.
For this example, we’ll access the ```ingredient``` instance variable of our directive and set an ```extraIngredient``` instance variable with its value:

``` 
...
export class AppComponent implements AfterViewInit {
  extraIngredient: string;

  @ViewChild(BaconDirective)
  set appBacon(directive: BaconDirective) {
    this.extraIngredient = directive.ingredient;
  };

  ngAfterViewInit() {
    console.log(this.extraIngredient); // mayo
  }
}
```
We used a setter here to set our extraIngredient variable. Notice that we wait for the **AfterViewInit** lifecycle hook to access our variable, as this is when child components and directives become available.

* DOM Elements
  We can access native DOM elements that have a template reference variable. Let’s say we have this in our template with the someInput reference variable:
  ``` 
  <input #someInput placeholder="Your favorite pizza toping">
  ```
  We can access the input itself with ViewChild like this:
  ``` 
  ...
  export class AppComponent implements AfterViewInit {
    @ViewChild('someInput') someInput: ElementRef;

    ngAfterViewInit() {
      this.someInput.nativeElement.value = "Anchovies! 🍕🍕";
    }
  }
  ```
  And the value of our input will be set to Anchovies! 🍕🍕 when ngAfterViewInit fires.

* Child Components
  It’s just as easy to access a child component and call methods or access instance variables that are available on the child. Let’s say we have a child component with a whoAmI method like this:
  ``` 
  whoAmI() {
    return '👶 I am a child!!';
  }
  ```
  We can then call that method from within our parent component class with ViewChild like this: 
  ``` 
  ...
  export class AppComponent implements AfterViewInit {
    @ViewChild(ChildComponent) child: ChildComponent;

    ngAfterViewInit() {
      console.log(this.child.whoAmI()); // 👶 I am a child!
    }
  }
  ```

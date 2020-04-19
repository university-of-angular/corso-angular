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

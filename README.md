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

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
## @ViewChildren decorator
Returns the specified elements or directives from the view DOM as QueryList.
We can use the **@ViewChildren** decorator to grab elements from the host view.
The **@ViewChildren** decorator supports directive or component type as parameter, or the name of a template variable.
* When the parameter is a component/directive the return value will be the component/directive instance.
* When the parameter is the name of a template variable, the return value will be a reference to the   
  native element.

### QueryList
Is just a fancy name for an object that stores a list of items. What is special about this object is when the state of the application changes Angular will automatically update the object items for you.
The **QueryList** is initialized only before the **ngAfterViewInit** lifecycle hook, therefore, is available only from this point.


# Angular component lifecycle hook
## AfterViewInit
Respond after Angular initializes the component's views and child views / the view that a directive is in.
Called once after the first **ngAfterContentChecked()**.

**AfterViewInit** is called when the component's view has been attached. Remember that Angular compiles all to JS files, not html - the framework manages templates in code and has a rendering engine to interact with the DOM. Here, **@ViewChild** and **@ViewChildren** will be resolved.

# Angular projection with ng-content
Content projection (also known as transclusion) is a way to import HTML content from outside the component and insert that content into the component’s template in a designated spot.
In that way, we can create configurable components.

## Why we use it?
* Many Components in your app using same structure and style but the content are different, in another   
  word **Reusability**.
* You build a component for display only and the other component built for handling user actions, in 
  another word **Separation of concern**.

## Why we use it?
* Single-Slot
  Basically you just add **<ng-content></ng-content>** in your html and this will replaced with content from outside the component:
  ``` 
  <!-- inside container component -->
  <ng-content></ng-content>
  <!-- inside another component -->
  <container-component> <p>Content Here</p> </container-component>
  ```
* Multi-slot ( Targeted projection)
  **ng-content** accepts a select attribute, which allow us to set specific css selector name for that slot.
  * Using element(s) name
    ``` 
    <!-- inside container component -->
    <ng-content select="slot-one"></ng-content>
    <!-- inside another component using container component -->
    <container-component>
      <slot-one>Content For Slot one</slot-one>
    </container-component>
    ```

    Unhandled Promise rejection: Template parse errors: ‘slot-one’ is not a known element, Angular does not recognize the slot-one tag. slot-one is neither a directive nor a component.
    A quick way to get around this error is to add schema metadata property in your module, set value to NO_ERRORS_SCHEMA in your module file.
    ``` 
    @NgModule({
    ...
    schemas: [NO_ERRORS_SCHEMA] // add this line
    })
    ```
  * Using Attribute(s) [name] | [name][another-name]
    ``` 
    <!-- inside container component -->
    <!-- Using Single Attribute -->
    <ng-content select="[slot-one]"></ng-content>
    <!-- Using Multiple Attributes -->
    <ng-content select="[slot][two]"></ng-content>
    <!-- inside another component using container component -->
    <container-component>
      <p slot-one>Content For Slot one</p>
      <p slot two>Content For Slot two</p>
    </container-component>
    ```

  * Using Attribute with Value [name="vlue"]
    ``` 
    <!-- inside container component -->
    <ng-content select="[slot='one']"></ng-content>
    <ng-content select="[slot='two']"></ng-content>
    <!-- inside another component using container component -->
    <container-component>
      <p slot="one">Content For Slot one</p>
      <p slot="two">Content For Slot two</p>
    </container-component>
    ```

  * Using class(s) .name | .name.another-name
    ``` 
    <!-- inside container component -->
    <!-- Using Single Class -->
    <ng-content select=".slot-one"></ng-content>
    <!-- Using Multi Class -->
    <ng-content select=".slot.two"></ng-content>
    <!-- inside another component using container component -->
    <container-component>
      <p class="slot-one">Content For Slot one</p>
    </container-component>
    ```
 #### Ej: Loading spinners
 Here is what we want to accomplish:

 ``` 
 (final.html)
 <loader [loading]="loading">
  <div class="form-group">
    <div>
      <input placeholder="First Name"/>
    </div>

    <div>
      <input placeholder="Last Name"/>
    </div>

    <div>
      <input type="number" placeholder="Age"/>
    </div>

    <div>
      <button (click)="submit()">Submit</button>
    </div>
    
  </div>
</loader>
 ```
Now we have a form inside a custom loader component, which receives a loading property as an Input, which, naturally, disables the form by covering it under an opaque veil, and displays the loading animation over it. When user clicks the Submit button, the submit method will be called, which will change the loading property to true before the HTTP request starts and then set it back to false once the request finishes.
The .ts code for the loader component is fairly simple:
``` 
(loader.component.ts)
import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  @Input() loading = false;
}
```
HTML is not really more complex:
``` 
(loader.component.html)
<div class="content" [ngClass]="{loading: loading}">
  <ng-content></ng-content>

  <div class="blocked">
    <i class="pi pi-spin pi-spinner"></i>
  </div>
</div>
```

So we project the child content inside a div, which will receive a loading class depending on the Input from a parent component, and that, in its case, will determine whether to display or not to display the animation. I used PrimeIcons in my example but you may load any sort of icon you want.
But the main thing is going on inside the .css file for our component:
``` 
.content {
  position: relative;
}

.blocked {
  display: none;
}

.loading > .blocked {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.4;
  color: white;
  z-index: 2;
}
```
Now we can reuse our loader component on any piece of HTML. For example:
``` 
<loader [loading]="loading">
  <another-form></another-form>
  <some-footer></some-footer>
</loader>
```

#### Ej: Form Controls
Take a look at this particular template:
``` 
<div class="form-container">
  <form>
    <h4>Personal Info</h4>
    <div class="form-control">
      <label>First Name</label>
      <div class="form-input">
        <input placeholder="First Name" />  
      </div> 
    </div>

    <div class="form-control">
      <label>Last Name</label>
      <div class="form-input">
        <input placeholder="Last Name" />  
      </div> 
    </div>

    <div class="form-control">
      <label>Age</label>
      <div class="form-input">
        <input type="number" placeholder="16+" min="16"/>
      </div> 
    </div>
  </form>
</div>

<div class="form-container">
  <form>
    <h4>Additional</h4>
    <div class="form-control">
      <label>Gender:</label>
      <div class="form-input">
        Male
        <input type="radio"  />  
        Female
        <input type="radio" />  
        Other
        <input type="radio" />  
        Prefer not to provide
        <input type="radio" />  
      </div> 
    </div>

    <div class="form-control">
      <label>Receive notifictions by:</label>
      <div class="form-input">
        Email
        <input type="checkbox"/>
        Push
        <input type="checkbox"/> 
      </div> 
    </div>

    <div class="form-control">
      <label>Bio</label>
      <div class="form-input">
        <textarea placeholder="Bio"></textarea>  
      </div> 
    </div>
  </form>
</div>
```

Here we have two forms with lots of different inputs, but essentially the entire template is the same thing: a form inside a div with a certain class on it; inside it, form controls within similarly structured div -s, decorated with labels.
Let’s declutter this using content projection. We are going to create two components: form-container and form-control-wrapper. Let’s start with the first one:

``` 
(form-container.component.ts)
import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent {
  @Input() title: string;
}
```
And the HTML:
``` 
(form-container.component.html)
<div class="form-container">
  <form>
    <h4>{{ title }}</h4>
    <ng-content></ng-content>
  </form>
</div>
```
Basically this component will receive the title of the form and project its content into other HTML elements. We can also apply styles here to the overall form. By the way, we can also wrap the form into a loader component from the previous example if we wanted to without having to repeat ourselves.
Here is the individual control wrapper:
``` 
(form-control-wrapper.component.ts)
import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-control-wrapper',
  templateUrl: './form-control-wrapper.component.html',
  styleUrls: ['./form-control-wrapper.component.css']
})
export class FormControlWrapperComponent {
  @Input() label: string;
}
```
And then again, just content projection into a predefined template:
``` 
(form-control-wrapper.component.html)
<div class="form-control">
  <label>{{ label }}</label>
  <div class="form-input">
    <ng-content></ng-content> 
  </div> 
</div>
```

Let’s see how the original template will look like after we apply content projection:
``` 
<form-container title="Personal Info">
  <form-control-wrapper label="First Name">
    <input placeholder="First Name" />  
  </form-control-wrapper>

  <form-control-wrapper label="Last Name">
    <input placeholder="Last Name" />  
  </form-control-wrapper>

  <form-control-wrapper label="Age">
    <input type="number" placeholder="16+" min="16"/>
  </form-control-wrapper>
</form-container>

<form-container title="Additional">
  <form-control-wrapper label="Gender">
    Male
    <input type="radio"  />  
    Female
    <input type="radio" />  
    Other
    <input type="radio" />  
    Prefer not to provide
    <input type="radio" />  
  </form-control-wrapper>

    <form-control-wrapper label="Receive notifications by">
      Email
      <input type="checkbox"/>
      Push
      <input type="checkbox"/> 
    </form-control-wrapper>

    <form-control-wrapper label="Bio">
        <textarea placeholder="Bio"></textarea>   
    </form-control-wrapper>
</form-container>
```

#### Ej: Increasing complexity
Let’s take a look at Angular Material’s Card Component. Say, we are building a UI using this component, with frequently repeating patterns, like this one:
``` 
<mat-card>
  <mat-card-title>Card 1</mat-card-title>
  <mat-card-content>
    <div class="content">
      Some text (may be very long)
    </div>
  </mat-card-content>

  <mat-card-actions>
    <button>Submit</button>
    <button>Cancel</button>
  </mat-card-actions>

  <mat-card-footer>
    <div class="footer">
      P.S.: additional data
    </div>
  </mat-card-footer>
</mat-card>

<mat-card>
  <mat-card-title>Card 2</mat-card-title>
  <mat-card-content>
    <div class="content">
      <p>
        Completely different layout
      </p>
      <p>With several paragraphs</p>
      <p>Of <b>differently</b> formatted text</p>
    </div>
  </mat-card-content>

  <mat-card-actions>
    <div class="actions">
      <button>Delete</button>
    </div>
  </mat-card-actions>

  <mat-card-footer>
    <div class="footer">
      P.S.: additional data
    </div>
  </mat-card-footer>
</mat-card>
```

Now our to-be-projected content is separated — we cannot use just one ng-content tag, we need more, and a way to explain Angular into which one of them what piece of UI is going to be projected. Here comes the select attribute of the ng-content.
``` 
(card-wrapper.component.ts)
import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-wrapper',
  templateUrl: './card-wrapper.component.html',
  styleUrls: ['./card-wrapper.component.css']
})
export class CardWrapperComponent {
  @Input() title: string;
}
```

In this case the HTML file is of more interest:
``` 
(card-wrapper.component.html)
<mat-card>
  <mat-card-title>{{ title }}</mat-card-title>
  <mat-card-content>
    <ng-content select=".content"></ng-content>
  </mat-card-content>

  <mat-card-actions>
     <ng-content select=".actions"></ng-content>
  </mat-card-actions>

  <mat-card-footer>
     <ng-content select=".footer"></ng-content>
  </mat-card-footer>
</mat-card>
```

Notice the select attribute in the ng-content tag. This attribute tells Angular that only elements with a certain class should be projected into that particular ng-content. Here’s what the previous component look like now:
``` 
<card-wrapper title="Card 1">
  <div class="content">
    Some text (may be very long)
  </div>

  <div class="actions">
    <button>Submit</button>
    <button>Cancel</button>
  </div>

  <div class="footer">
    P.S.: additional data
  </div>
</card-wrapper>

<card-wrapper title="Card 1">
  <div class="content">
    <p>
      Completely different layout
    </p>
    <p>With several paragraphs</p>
    <p>Of <b>differently</b> formatted text</p>
  </div>

  <div class="actions">
    <button>Delete</button>
  </div>

  <div class="footer">
    P.S.: additional data
  </div>
</card-wrapper>
```
## @ContentChild decorator
This parameter decorator is used in order to query ONLY the projections content in the own component's template.
It's restrcited to the content part of the component instance.
It allows to fetch the **QueryList** of elements or directives from the content DOM. The **QueryList** is updated whenever the child element/component is added or removed.
The child element reference is set in **QueryList** just before the *ngAfterContentInit* lifecycle Hook method.
#### Ej:
```
@ContentChildren(ChildComp) contentChildren : QueryList<ChildComp>;
 ```
 Here, we are using the ContentChildren to get the QueryList containing the list of the child component ChildComp. The list is stored in the contentChildren variable in the Parent component.

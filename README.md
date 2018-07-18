## Develop Stencil components inside an Angular development environment

##### StencilJS is a custom component compiler that allows us to develop custom web components once and run them in any web app (regardless of framework).

Imagine a scenario where we have an [Angular](https://angular.io/) app and we want to build [custom web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) that will not only be used in it, but exported to other web applications as well. The custom components would be able to interact with our app (via inputs/events) and we'd like to have a fast development environment with both Angular and the components being compiled in real-time. Angular Elements will allow that scenario soon, but for now, [StencilJS](https://stenciljs.com/) can help us achieve that.

# This tutorial

In this tutorial we'll configure an Angular project (created with the [CLI](https://cli.angular.io/)) to build the Stencil components automatically during developmet, having the changes refresh in "real-dev-time" since it'll all be part of the same project. We'll also want to compile the components to production, once they're ready.


## 1. Adding Stencil support to our project

We'll start by adding the `stencil/core` and `stencil/sass` packages. If you're not interested in adding [Sass](https://sass-lang.com/) support, feel free to skip that one.

`npm install @stencil/core`

`npm install @stencil/sass`

Then, add a file called `stencil.config.js` to the root of our project. Its contents will look like this:

```javascript
const sass = require('@stencil/sass');

exports.config = {
  bundles: [ //Our custom components will be defined here. Check Stencil Bundles for advanced details.
    { components: ['datalist-selector'] }
  ],
  srcDir: 'src/stencil-components', //The source of our Stencil code
  collections: [
  ],
  plugins: [
    sass() //If you're not insterested in adding Sass support, remove it from here and from the "require" above.
  ],
  namespace: "MyCustomElements", //Namespace for the custom elements. Default value is "App".
  outputTargets: [
    { //The output directory of the compiled custom elements. We'll load those as resources into our Angular app:
      type: 'www',
      dir: 'src/assets',
      buildDir: 'stencil-build',
    }
  ]
};
```

And another config tweak we'll need, is to add JSX support to TypeScript. In the `tsconfig.json` file of your project, add:

```javascript
//inside the "compilerOptions" section:
"jsx": "preserve"
```
And:
```javascript
//in the root of tsconfig.json
"include": [
  "src",
  "types/jsx.d.ts"
]
```

## 2. A simple Stencil component

Let's add a little Stencil component that receives an array of items and displays them in a html datalist. When the user picks a value, the component will emit an event to the outsite world.

Add both files below into the `src/stencil-components` folder:

`datalist-selector.component.tsx`:

```typescript
import { Component, Prop, Event, EventEmitter  } from '@stencil/core';

@Component({
  tag: 'datalist-selector',
  styleUrl: 'datalist-selector.component.scss'
})
export class DatalistSelectorComponent {

  @Prop() items: string[];
  @Event() onSelect: EventEmitter;

  handleChange(event) {
    this.onSelect.emit(event.target.value);
  }

  render() {
    const items = this.items || ['No "items" Prop provided.']
    return (
      <div>
        <input list="datalist-selector" 
          onChange={(event) => this.handleChange(event)} />
        
        <datalist id="datalist-selector">
          {items.map(item =>
            <option value={item}></option>
          )}
        </datalist>
      </div>
    )
  }
}
```

`datalist-selector.component.scss`:

```scss 
datalist-selector {

  font-size: 14px;

  input {
    padding: 7px 10px;
    border-radius: 3px;
    border: 1px solid gray;
  }
}
```


## 3. Building the Stencil component and watching its changes while serving the Angular app

Let's add some scripts to the `packages.json` file to compile the Stencil components. In the "scripts" section, add:

```json
"stencil.build.watch": "stencil build --dev --watch",
"stencil.build.prod": "stencil build --prod"
```

That'll be enough to both develop the components and compile them for production. But it'd be way better if we can run the `"--watch"` command together with our regular ``ng serve`` for development. That'll make both Angular and Stencil compile and serve our changes to the browser!

Let's use the [concurrently](https://github.com/kimmobrunfeldt/concurrently) package to run both scripts for us. It's great for running multiple commands concurrently, with multi-platform support.

`npm install concurrently`

Then, modify the `start` script to look like this:

`"start": "concurrently \"npm run stencil.build.watch\" \"ng serve\"",`

If we run `npm start` now, we'll have our Angular project "serving" the compiled custom elements as well. The compiled files will be found in the folder configured in step 1 (`src/assets/stencil-build`).


## 4. Configuring Angular to use custom elements

In our Angular Module, we'll need to load the `CUSTOM_ELEMENTS_SCHEMA`:

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { 
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA //Enabling custom elements, needed for Stencil components   
} from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA //Adding it as a schema here.
  ]
})
export class AppModule { }
```

Then, let's load the compiled Stencil Components file into our web page. The easiest way is to add the script tag below to the <head> section of the `index.html` file:

```html
<script src="assets/stencil-build/mycustomelements.js"></script>
```


## 5. Adding our custom component into the Angular webpage

In an Angular component, let's define the input for our Stencil component, as well as handle the event it emits:

`app.component.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items = ['Angular', 'React', 'Vue', 'Ember', 'Stencil']

  selectedItem: string;

  onItemSelected(event: CustomEvent) {
    this.selectedItem = event.detail;
  }
}
```

And in the template file, our custom element dwells:

`app.component.html`:

``` html
<div>
  <label>Pick a framework:</label>

  <datalist-selector [items]="items" (onSelect)="onItemSelected($event)"></datalist-selector> 

  <div *ngIf="selectedItem">
    You selected {{ selectedItem }}!
  </div>

</div>
```

If everything is in place, running our `npm start` from step 3 will display our app with our custom component! If you try changing the Stencil code, you'll see that our environment will build and refresh everything automatically. Our powerful dev environment is ready to go.


## 6. Ignoring Stencil build files in the source control

Our project is now compiling the Stencil build files into our project, but they don't need to go into source-control as they're auto-generated.

Simply add these two lines into your `.gitignore` file and you'll be good to go:

```
# StencilJS build files
.stencil/*
/src/assets/stencil-build
```


## And we're good!

Clone this repo to see the entire thing working. Happy custom-elements coding! :smiley:

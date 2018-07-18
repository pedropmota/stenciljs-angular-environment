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

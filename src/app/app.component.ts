import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Angular and StencilJS together!';

  items = ['Angular', 'React', 'Vue', 'Ember', 'Stencil']

  selectedItem: string;

  onItemSelected(event: CustomEvent) {
    this.selectedItem = event.detail;
  }
}

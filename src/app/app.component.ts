import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Person Management System</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
      }
    `
  ]
})
export class AppComponent { 

  title = "contactList"

}

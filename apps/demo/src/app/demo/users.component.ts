
import {Component} from "@angular/core";
@Component({
  selector: '',
  template: `
    <h1>
       Users list
    </h1>
    
    <ul>
      <li><a [routerLink]="['details', 1]">First User </a></li>
      <li><a [routerLink]="['details', 2]">Second User</a></li>
    </ul>
  `,

})
export class UsersComponent {

}

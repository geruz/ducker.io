import { Component, Input } from '@angular/core';

@Component({
    selector: 'button-drop',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['dropdown.component.scss']
})
export class ButtonDropdownComponent {
  @Input('title') ElementTitle: 'Выпадающий список';
  @Input('list') ElementList: any[];

  public display() {
    
  }
}
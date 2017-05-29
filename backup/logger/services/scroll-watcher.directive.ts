import {
  Directive, Output, EventEmitter, ElementRef, HostListener
} from '@angular/core';

@Directive({
  selector: '[scroll]'
})
export class ScrollDir {
  @Output() setScroll = new EventEmitter();
  private scroll: number;

  constructor(private el: ElementRef) { }

  @HostListener('scroll', ['$event'])
  public scrollIt() { 
    return event.srcElement.scrollTop; 
  }

  public reset() {  this.el.nativeElement.scrollTop = this.scroll; console.log('this.el.nativeElement.scrollTop: ' + this.el.nativeElement.scrollTop) }
}
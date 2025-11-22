import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appTypewritter]',
})
export class TypewritterDirective {

  @Input() text: string = '';
  @Input() speed: number = 50; // Speed in milliseconds

  private index: number = 0;
  private intervalId: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    setTimeout(() => {
      this.startTyping();

    }, 500);
  }

  private startTyping() {
    this.intervalId = setInterval(() => {
      this.renderer.setProperty(this.el.nativeElement, 'innerText', this.text.substring(0, this.index));
      this.index++;

      if (this.index > this.text.length) {
        clearInterval(this.intervalId);
      }
    }, this.speed);
  }


}

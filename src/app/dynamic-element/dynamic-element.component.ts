import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-element',
  templateUrl: './dynamic-element.component.html',
  styleUrls: ['./dynamic-element.component.css'],
})
export class DynamicElementComponent implements OnInit {
  @Input('element') element;

  constructor() {}

  ngOnInit(): void {}
}

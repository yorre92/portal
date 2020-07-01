import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dynamic-element',
  templateUrl: './dynamic-element.component.html',
  styleUrls: ['./dynamic-element.component.css'],
})
export class DynamicElementComponent implements OnInit {
  @Input('element') element;
  @Input('index') index;

  constructor() {}

  ngOnInit(): void {
  }
}

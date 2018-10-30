import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.css']
})
export class CopyrightComponent implements OnInit {
  now = new Date();
  constructor() {
    this.now = this.now;
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tintuc2',
  templateUrl: './tintuc2.component.html',
  styleUrls: ['./tintuc2.component.css']
})
export class Tintuc2Component implements OnInit {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tintuc1',
  templateUrl: './tintuc1.component.html',
  styleUrls: ['./tintuc1.component.css']
})
export class Tintuc1Component implements OnInit {

  constructor() { }
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  ngOnInit(): void {
  }

}

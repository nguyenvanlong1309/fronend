import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tintuc3',
  templateUrl: './tintuc3.component.html',
  styleUrls: ['./tintuc3.component.css'],
})
export class Tintuc3Component implements OnInit{

  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor() { }

  ngOnInit(): void {
  }
}

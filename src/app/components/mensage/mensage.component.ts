import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mensage',
  templateUrl: './mensage.component.html',
  styleUrls: ['./mensage.component.css']
})
export class MensageComponent implements OnInit {

  @Input() validationMsg: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}

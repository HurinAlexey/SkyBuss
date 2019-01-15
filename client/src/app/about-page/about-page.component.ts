import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MaterialService} from '../shared/services/material.service';
import {MnFullpageService} from 'ngx-fullpage';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.less']
})
export class AboutPageComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    MaterialService.tooltipInitialize('.tooltipped');
  }

}

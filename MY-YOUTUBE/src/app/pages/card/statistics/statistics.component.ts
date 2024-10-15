import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StatisticsData } from './../../../utils/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  @Input() statistics?: StatisticsData;
  @ViewChild('like') private like: HTMLDivElement | undefined;

  ngOnInit() {
    console.log(this.statistics);
  }
  public liked() {
    this.like?.classList.toggle('liked');
  }
}

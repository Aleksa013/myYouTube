import { Component, Input } from '@angular/core';
import { StatisticsData } from '../../utils/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {
  @Input() statistics?: StatisticsData;
}

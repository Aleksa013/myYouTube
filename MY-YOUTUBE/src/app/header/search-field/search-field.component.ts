import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent {
  public search: string;
  constructor(private searchService: VideoService) {
    this.search = '';
  }

  protected onSubmit() {
    console.log(this.search);
    this.searchService.getSearch(this.search).subscribe((answer) => {
      console.log(answer);
    });
  }
}

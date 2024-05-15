import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EntrepriseService} from "../../core/services/entreprise.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-elasticsearch',
  templateUrl: './elasticsearch.component.html',
  styleUrl: './elasticsearch.component.scss'
})
export class ElasticsearchComponent implements OnInit{

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  breadcrumbItems: any[] = [];
  constructor(private entrepriseService: EntrepriseService) { }
enterprises: any[] = [];
  ngOnInit(): void {

  }
  getEnterprises(): void {
    const searchPhrase = this.searchInput.nativeElement.value;

    if (!searchPhrase|| searchPhrase.length < 3) {
      // If the search phrase is empty, clear the enterprises array
      this.enterprises = [];
      return;
    }

    this.entrepriseService.searchEnterprises(searchPhrase).subscribe(
      (data) => {
        this.enterprises = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}

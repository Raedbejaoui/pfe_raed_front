import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ElasticSearchService} from "../../core/services/elastic-search.service";

@Component({
  selector: 'app-elasticsearch',
  templateUrl: './elasticsearch.component.html',
  styleUrls: ['./elasticsearch.component.scss']
})
export class ElasticsearchComponent implements OnInit{

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  breadcrumbItems: any[] = [];
  documents: any[] = [];
  allDocuments: any[] = []; // New array to store all documents

  constructor(private elasticSearchService: ElasticSearchService) { }

  ngOnInit(): void {
    this.getAllDocuments();
  }

  getAllDocuments(): void {
    this.elasticSearchService.searchAllDocuments<any>().subscribe(
      (data) => {
        this.allDocuments = data; // Store all documents
        this.documents = data; // Display all documents
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getDocumentById(id: string): void {
    this.elasticSearchService.getDocumentById<any>(id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  deleteDocumentById(id: string): void {
    this.elasticSearchService.deleteDocumentById(id).subscribe(
      (response) => {
        console.log(response);
        // After deletion, refresh the list of documents
        this.getAllDocuments();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  searchDocuments(): void {
    const searchTerm = this.searchInput.nativeElement.value.toLowerCase();
    if (searchTerm) {
      this.documents = this.allDocuments.filter(document =>
          document.name.toLowerCase().includes(searchTerm) ||
          document.description.toLowerCase().includes(searchTerm)
        // Add more fields if needed
      );
    } else {
      this.documents = this.allDocuments; // If search term is empty, display all documents
    }
  }
}

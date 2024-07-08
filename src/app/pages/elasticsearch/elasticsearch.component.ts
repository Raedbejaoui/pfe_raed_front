import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ElasticSearchService} from "../../core/services/elastic-search.service";
import {AuthService} from "../../account/authentification/auth.service";
import {Router} from "@angular/router";

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

  constructor(private elasticSearchService: ElasticSearchService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllDocuments();
  }

  getAllDocuments(): void {
    this.elasticSearchService.searchAllDocuments<any>().subscribe(
      (data) => {
        this.allDocuments = data; // Store all documents
        this.documents = data; // Display all documents
        this.getUserImages(); // Get user images
        console.log(this.documents);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
getUserImages(): void {
  this.documents.forEach(document => {
    this.authService.loadUserByEmail(document.email).subscribe(
      (user) => {
        if (user && user.imageProfile) {
          document.imageProfile = user.imageProfile;
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  });
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
  const searchTerms = this.searchInput.nativeElement.value.toLowerCase().split(' ');
  if (searchTerms.length) {
    this.documents = this.allDocuments.filter(document =>
      searchTerms.some((term: string) => // Utilisez 'some' au lieu de 'every'
        (document.name ? document.name.toLowerCase().includes(term) : false) ||
        (document.description ? document.description.toLowerCase().includes(term) : false) ||
        (document.domain ? document.email.toLowerCase().includes(term) : false) ||
        (document.phone ? document.phone.toLowerCase().includes(term) : false)
      )
    );
  } else {
    this.documents = this.allDocuments; // If search term is empty, display all documents
  }
}



  openChat(enterpriseId: string) {
    this.router.navigate(['/chat', enterpriseId]);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElasticsearchComponent } from './elasticsearch.component';

describe('ElasticsearchComponent', () => {
  let component: ElasticsearchComponent;
  let fixture: ComponentFixture<ElasticsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElasticsearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElasticsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

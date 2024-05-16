import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreClientComponent } from './offre-client.component';

describe('OffreClientComponent', () => {
  let component: OffreClientComponent;
  let fixture: ComponentFixture<OffreClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffreClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreEntrepriseComponent } from './offre-entreprise.component';

describe('OffreEntrepriseComponent', () => {
  let component: OffreEntrepriseComponent;
  let fixture: ComponentFixture<OffreEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreEntrepriseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffreEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

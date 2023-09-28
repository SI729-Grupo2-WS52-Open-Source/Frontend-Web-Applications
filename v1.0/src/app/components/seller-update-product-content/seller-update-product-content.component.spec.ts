import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateProductContentComponent } from './seller-update-product-content.component';

describe('SellerUpdateProductContentComponent', () => {
  let component: SellerUpdateProductContentComponent;
  let fixture: ComponentFixture<SellerUpdateProductContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerUpdateProductContentComponent]
    });
    fixture = TestBed.createComponent(SellerUpdateProductContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

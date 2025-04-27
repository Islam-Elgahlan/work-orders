import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorkOrdersComponent } from './add-edit-work-orders.component';

describe('AddEditWorkOrdersComponent', () => {
  let component: AddEditWorkOrdersComponent;
  let fixture: ComponentFixture<AddEditWorkOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditWorkOrdersComponent]
    });
    fixture = TestBed.createComponent(AddEditWorkOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

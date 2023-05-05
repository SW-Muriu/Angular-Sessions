import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqApprovedApplicationsComponent } from './rfq-approved-applications.component';

describe('RfqApprovedApplicationsComponent', () => {
  let component: RfqApprovedApplicationsComponent;
  let fixture: ComponentFixture<RfqApprovedApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqApprovedApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqApprovedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

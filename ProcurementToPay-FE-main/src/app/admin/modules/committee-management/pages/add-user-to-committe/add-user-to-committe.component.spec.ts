import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToCommitteComponent } from './add-user-to-committe.component';

describe('AddUserToCommitteComponent', () => {
  let component: AddUserToCommitteComponent;
  let fixture: ComponentFixture<AddUserToCommitteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserToCommitteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToCommitteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

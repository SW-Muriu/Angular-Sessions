import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profiles2Component } from './profiles2.component';

describe('Profiles2Component', () => {
  let component: Profiles2Component;
  let fixture: ComponentFixture<Profiles2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Profiles2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profiles2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

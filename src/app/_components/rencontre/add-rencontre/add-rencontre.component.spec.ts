import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRencontreComponent } from './add-rencontre.component';

describe('AddRencontreComponent', () => {
  let component: AddRencontreComponent;
  let fixture: ComponentFixture<AddRencontreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRencontreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRencontreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

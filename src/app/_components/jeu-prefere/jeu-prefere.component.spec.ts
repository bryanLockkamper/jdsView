import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuPrefereComponent } from './jeu-prefere.component';

describe('JeuPrefereComponent', () => {
  let component: JeuPrefereComponent;
  let fixture: ComponentFixture<JeuPrefereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeuPrefereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeuPrefereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

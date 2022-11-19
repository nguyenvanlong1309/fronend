import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserPostComponent } from './browser-post.component';

describe('BrowserPostComponent', () => {
  let component: BrowserPostComponent;
  let fixture: ComponentFixture<BrowserPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

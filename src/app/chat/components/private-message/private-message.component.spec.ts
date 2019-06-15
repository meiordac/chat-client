import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateMessageComponent } from './private-message.component';

describe('PrivateMessageComponent', () => {
  let component: PrivateMessageComponent;
  let fixture: ComponentFixture<PrivateMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { ChatModule } from '../../chat.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ChatModule, NoopAnimationsModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user as Anonymous', () => {
    expect(component.user).toEqual({ id: null, name: 'Anonymous' });
  });

  it('should initialize user as Anonymous', () => {
    spyOn(component.socketService, 'send');
    component.messageContent = 'test message';
    component.sendMessage();
    expect(component.socketService.send).toHaveBeenCalledWith({
      from: component.user,
      content: 'test message'
    });
  });
});

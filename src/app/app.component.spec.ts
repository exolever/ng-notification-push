import { TestBed } from '@angular/core/testing';
import { SwPush } from '@angular/service-worker';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { NewsletterService } from './services/newsletter.service';

describe('AppComponent', () => {
  const swPushMock = {
    requestSubscription: vi.fn()
  };
  const newsletterServiceMock = {
    addPushSubscriber: vi.fn(),
    send: vi.fn()
  };

  beforeEach(async () => {
    swPushMock.requestSubscription.mockReset();
    newsletterServiceMock.addPushSubscriber.mockReset();
    newsletterServiceMock.send.mockReset();
    newsletterServiceMock.addPushSubscriber.mockReturnValue(of({}));
    newsletterServiceMock.send.mockReturnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: SwPush, useValue: swPushMock },
        { provide: NewsletterService, useValue: newsletterServiceMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render notification action buttons', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll('button')).map(button => button.textContent?.trim());

    expect(buttons).toContain('Subscribe');
    expect(buttons).toContain('Send');
  });

  it('should send newsletters through the service', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.sendNewsletter();

    expect(newsletterServiceMock.send).toHaveBeenCalledTimes(1);
  });
});

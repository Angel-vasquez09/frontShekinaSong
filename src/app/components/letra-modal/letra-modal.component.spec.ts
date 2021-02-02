import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LetraModalComponent } from './letra-modal.component';

describe('LetraModalComponent', () => {
  let component: LetraModalComponent;
  let fixture: ComponentFixture<LetraModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetraModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LetraModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

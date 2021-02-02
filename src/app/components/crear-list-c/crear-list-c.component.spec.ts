import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearListCComponent } from './crear-list-c.component';

describe('CrearListCComponent', () => {
  let component: CrearListCComponent;
  let fixture: ComponentFixture<CrearListCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearListCComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearListCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

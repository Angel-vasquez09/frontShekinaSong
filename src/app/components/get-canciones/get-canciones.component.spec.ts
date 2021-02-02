import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetCancionesComponent } from './get-canciones.component';

describe('GetCancionesComponent', () => {
  let component: GetCancionesComponent;
  let fixture: ComponentFixture<GetCancionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCancionesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

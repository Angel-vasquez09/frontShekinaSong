import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaCancionesPage } from './lista-canciones.page';

describe('ListaCancionesPage', () => {
  let component: ListaCancionesPage;
  let fixture: ComponentFixture<ListaCancionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCancionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCancionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

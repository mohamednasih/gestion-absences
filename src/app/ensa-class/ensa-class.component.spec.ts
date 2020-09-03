import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnsaClassComponent } from './ensa-class.component';

describe('EnsaClassComponent', () => {
  let component: EnsaClassComponent;
  let fixture: ComponentFixture<EnsaClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnsaClassComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnsaClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

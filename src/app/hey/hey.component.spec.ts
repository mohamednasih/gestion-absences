import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeyComponent } from './hey.component';

describe('HeyComponent', () => {
  let component: HeyComponent;
  let fixture: ComponentFixture<HeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

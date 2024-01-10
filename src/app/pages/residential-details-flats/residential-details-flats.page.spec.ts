import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResidentialDetailsFlatsPage } from './residential-details-flats.page';

describe('ResidentialDetailsFlatsPage', () => {
  let component: ResidentialDetailsFlatsPage;
  let fixture: ComponentFixture<ResidentialDetailsFlatsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentialDetailsFlatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentialDetailsFlatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

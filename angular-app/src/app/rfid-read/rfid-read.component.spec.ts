import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidReadComponent } from './rfid-read.component';

describe('RfidReadComponent', () => {
  let component: RfidReadComponent;
  let fixture: ComponentFixture<RfidReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RfidReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RfidReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

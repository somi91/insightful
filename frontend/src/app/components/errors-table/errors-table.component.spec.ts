import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsTableComponent } from './errors-table.component';

describe('ErrorsTableComponent', () => {
  let component: ErrorsTableComponent;
  let fixture: ComponentFixture<ErrorsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorsTableComponent]
    });
    fixture = TestBed.createComponent(ErrorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

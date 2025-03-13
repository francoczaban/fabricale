import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaExpandibleComponent } from './tabla-expandible.component';

describe('TablaExpandibleComponent', () => {
  let component: TablaExpandibleComponent;
  let fixture: ComponentFixture<TablaExpandibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaExpandibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaExpandibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

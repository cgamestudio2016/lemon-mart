import { TestBed } from '@angular/core/testing'
import { MediaObserver } from '@angular/flex-layout'

import { AppComponent } from './app.component'
import {
  MediaObserverFake,
  commonTestingModules,
  commonTestingProviders,
} from './common/common.testing'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: commonTestingModules,
      providers: commonTestingProviders.concat([
        {
          provide: MediaObserver,
          useClass: MediaObserverFake,
        },
      ]),
      declarations: [AppComponent],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'lemon-mart'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('lemon-mart')
  })

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent)
  //   fixture.detectChanges()
  //   const compiled = fixture.nativeElement
  //   expect(compiled.querySelector('.content span').textContent).toContain('lemon-mart')
  // })
})

import { TestBed } from '@angular/core/testing'

import { commonTestingModules, commonTestingProviders } from '../common/common.testing'
import { AuthGuardService } from './auth-guard.service'

describe('AuthGuardService', () => {
  let service: AuthGuardService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: commonTestingModules,
      providers: commonTestingProviders,
    })
    service = TestBed.inject(AuthGuardService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

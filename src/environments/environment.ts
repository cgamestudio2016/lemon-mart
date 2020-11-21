import { AuthMode } from './../app/auth/auth.enum'
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBgy57Cx5vVDXy8B_PmfZK9H3LNOgEbUxM',
    projectId: 'lemon-mart-21721',
    appId: '1:1062550953916:web:97981a3b912dbed9e695b9',
  },
  authMode: AuthMode.InMemory,
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

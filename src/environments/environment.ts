// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  local: true,
  matadorsuite: {
    www: 'http://mts.myaisdc.com',
    portfolio: '/portfolio',
    product: '/product',
    evaluation: '/evaluation'
  },
  timesheet: {
    api: 'http://team-api.mts.myaisdc.com',
    web: '/team',
  },
  pop: {
    api: 'http://pop-api.mts.myaisdc.com',
  },
  git: {
    web: 'https://git.matadorsuite.com/',
  },
  jenkins: {
    web: ''
  },
  xwiki: {
    web: 'https://wiki.matadorsuite.com/xwiki'
  },
  authConfig: {
    clientId: 'client-matadorsuite-dev',
    server: 'https://auth.matadorsuite.com',
    scope: 'email openid profile roles api-matadorsuite api-pop api-notification api-teabreak',
    postLogoutRedirectUrl: 'http://mts.myaisdc.com'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.

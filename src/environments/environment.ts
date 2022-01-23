// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  firebase: {
    apiKey: 'AIzaSyDdTJOJVpFwrrgZ7X5w2TRGmIfPrdVXLMc',
    authDomain: 'eto-baza.firebaseapp.com',
    projectId: 'eto-baza',
    storageBucket: 'eto-baza.appspot.com',
    messagingSenderId: '984130362028',
    appId: '1:984130362028:web:a68a95d541f577a0d8dd09'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

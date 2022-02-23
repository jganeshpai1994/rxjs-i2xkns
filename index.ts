// pipeable operator

import { EMPTY, fromEvent, Observable, of, Subscription } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  catchError,
  concatMap,
  debounceTime,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';

const filterObservable$ = new Observable<string>((subscribe) => {
  subscribe.next('Sports');
  subscribe.next('Business');
  setTimeout(() => subscribe.next('Business'), 3000);
  setTimeout(() => subscribe.next('Sports'), 5000);
});

// filter
// const sportsFeedObservable$ = filterObservable$.pipe(
//   filter((item) => item === 'Sports')
// );

// sportsFeedObservable$.subscribe((value) => console.log(value));

// map
// const mapObservable$ = new Observable<Number>((subscribe) => {
//   for (let i = 0; i < 5; i++) {
//     setTimeout(() => subscribe.next(i), i * 1000);
//   }
// });

// const mapFeedObservable$ = mapObservable$.pipe(map((item) => item));
// mapFeedObservable$.subscribe((value) => console.log(value));

// tap
// of(1,3,5,6,7).pipe(
//   tap(value => console.log('Spy:',value)),
//   map((item)=> item * 2),
//   filter((item)=> item > 5)
// ).subscribe(value=> console.log('Output:',value))

//debounceTime
// used for sliders in html
// const slider = document.querySelector('input#slider');
// fromEvent(slider, 'input')
//   .pipe(
//     debounceTime(2000),
//     map((event) => event.target['value'])
//   )
//   .subscribe((value) => console.log(value));

//catchError
// const failingHttpRequest$ = new Observable((subscriber) => {
//   setTimeout(() => {
//     subscriber.error(new Error('Timeout'));
//   }, 3000);
//   setTimeout(() => {
//     subscriber.next('Data');
//   }, 4000);
// });

// console.log('App Started');

//EMPTY internally handles the error and sends complete notification
// failingHttpRequest$
//   //.pipe(catchError((error) => of('Fallback Value')))
//   .pipe(catchError(() => EMPTY))
//   .subscribe({
//     next: (value) => console.log(value),
//     complete: () => console.log('Completed'),
//   });

//concatMap
const source$ = new Observable<string>((subscriber) => {
  setTimeout(
    () => subscriber.next('https://random-data-api.com/api/name/random_name'),
    2000
  );
  setTimeout(
    () =>
      subscriber.next('https://random-data-api.com/api/nation/random_nation'),
    2000
  );
  setTimeout(
    () => subscriber.next('https://random-data-api.com/api/natio1n/error'),
    5000
  );
  setTimeout(
    () =>
      subscriber.next('https://random-data-api.com/api/nation/random_nation'),
    7000
  );
  // setTimeout(() => subscriber.complete(), 5000);
  // setTimeout(() => subscriber.next('A'), 6000);
});

// source$
//   .pipe(
//     concatMap((value) =>
//       ajax(value).pipe(
//         catchError((error) => of(`Could not fetch ${error}`)),
//         tap((m) => console.log)
//       )
//     )
//   )
//   .subscribe({
//     next: (value: any) => console.log(value),
//     error: (err: any) => console.log('Error:', err),
//     complete: () => console.log('Completed'),
//   });

//switchMap
// does not wait for previous subscription but cancels older subscription and starts new subscription
// source$
//   .pipe(
//     switchMap((value) =>
//       ajax(value).pipe(
//         catchError((error) => of(`Could not fetch ${error}`)),
//         tap((m) => console.log)
//       )
//     )
//   )
//   .subscribe({
//     next: (value: any) => console.log(value),
//     error: (err: any) => console.log('Error:', err),
//     complete: () => console.log('Completed'),
//   });

//mergeMap
source$
  .pipe(
    mergeMap((value) =>
      ajax(value).pipe(
        catchError((error) => of(`Could not fetch ${error}`)),
        tap((m) => console.log)
      )
    )
  )
  .subscribe({
    next: (value: any) => console.log(value),
    error: (err: any) => console.log('Error:', err),
    complete: () => console.log('Completed'),
  });

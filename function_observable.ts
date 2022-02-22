import {
  combineLatest,
  forkJoin,
  from,
  fromEvent,
  interval,
  Observable,
  of,
  timer,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
console.log('Hi');

setTimeout(() => console.log('Timed at data'), 4000);

setTimeout(() => console.log('Timed at data 2'), 2000);

// for(let i=0;i<10;i++)
// {
//   console.log('Data')
// }

// Creation Function
// of function
// of('Alice','Bob','Green').subscribe({
//   next: value=> console.log(value),
//   complete: ()=> console.log('Completed')
// })

// const name$ = new Observable<string>((subscriber)=>{
//   subscriber.next('Alice');
//   subscriber.next('Bob');
//   subscriber.next('Green');
//   subscriber.complete();
// });

// name$.subscribe({
//   next: (value)=>console.log(value),
//   complete: ()=> console.log('Completed')
// })

//from
// from(['D','G',"M"]).subscribe(value=> console.log('From',value));

// from(new Promise((resolve,reject)=>{
//   resolve('Resolved')
// })).subscribe((x)=> console.log(x))

//fromEvent
// const triggerButton = document.querySelector('button#data');

// const buttonObservable$ = fromEvent(triggerButton,'click');

// buttonObservable$.subscribe((value)=>{
//   console.log(value.type);
// });

// timer(5000).subscribe(x=>console.log(x))

// interval(200)

//forkJoin
const observable1$ = ajax('https://random-data-api.com/api/name/random_name');

const observable2$ = ajax(
  'https://random-data-api.com/api/nation/random_nation'
);

// forkJoin([observable1$, observable2$]).subscribe({
//   next: (value) => value.forEach((x, i) => console.log(x.response)),
//   complete: () => console.log('Completed'),
// });

//combineLatest
combineLatest([observable1$, observable2$]).subscribe({
  next: (value) => value.forEach((x, i) => console.log(x.response)),
  complete: () => console.log('Completed'),
});

forkJoin([of('ABC'), timer(1000)]).subscribe((value)=> console.log(value))

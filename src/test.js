import { fromEvent, interval } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';

const obs$1 = fromEvent(document, 'click');
const obs$2 = interval(1000);
const finalObs$ = obs$1.pipe(
  mergeMap(event => obs$2)
);
const subscription = finalObs$.subscribe((value) => console.log(value));
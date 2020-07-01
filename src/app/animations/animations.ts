import {
  trigger,
  state,
  style,
  transition,
  animate,
  stagger,
  query,
} from '@angular/animations';

export function easeIn() {
  return trigger('easeIn', [
    transition('* => *', [
      // each time the binding value changes
      query(':enter', [
        style({ opacity: 0, 'margin-top': '10px' }),
        stagger(100, [
          animate('0.5s', style({ opacity: 1, 'margin-top': '0px' })),
        ]),
      ]),
    ]),
  ]);
}

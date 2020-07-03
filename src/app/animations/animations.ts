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
      query(
        ':enter',
        [
          style({ opacity: 0, 'margin-top': '10px' }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1, 'margin-top': '0px' })),
          ]),
        ],
        { optional: true }
      ),
    ]),
  ]);
}

export function slideFromBottom() {
  return trigger('routerTransition', [
    state('void', style({ 'padding-top': '20px', opacity: '0' })),
    state('*', style({ 'padding-top': '0px', opacity: '1' })),
    transition(':enter', [
      animate('0.33s ease-out', style({ opacity: '1', 'padding-top': '0px' })),
    ]),
  ]);
}

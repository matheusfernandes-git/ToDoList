import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const showStateTrigger = trigger('showState', [
  transition(':enter', [   //quando o elemento aparece no DOM.
    style({
      opacity: 0,
    }),
    animate(300),
    style({
      opacity: 1,
    }),
  ]),
  transition(':leave', [   //quando o elementa está saindo do DOM.
    animate(300),
    style({
      opacity: 0,
    }),
  ]),
]);

// export const completedEffectTrigger = trigger('completedEffect', [
//   transition('* => checked', [
//     animate(
//       '400ms ease-in',
//       style({
//         transform: 'scale(0.5)',
//       })
//     ),
//   ]),
// ]);


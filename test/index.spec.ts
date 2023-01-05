import { app } from '../src/index';

window.parent.postMessage = jest.fn();

test('expected message returned', () => {
  app.startCall({ targets: ['*10'], requestedModalities: ['video'] });

  const message = { type: 'wazo/START_CALL', targets: ['*10'], requestedModalities:  ['video'] };
  expect(window.parent.postMessage).toHaveBeenCalledWith(message, '*');
})

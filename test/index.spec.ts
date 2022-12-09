import EUCPlugins from '../src/index';

window.parent.postMessage = jest.fn();

const plugins = new EUCPlugins();

test('expected message returned', () => {
  plugins.startCall({ targets: ['*10'], requestedModalities: ['video'] });

  const message = { type: 'wazo/START_CALL', targets: ['*10'], requestedModalities:  ['video'] };
  expect(window.parent.postMessage).toHaveBeenCalledWith(message, '*');
})

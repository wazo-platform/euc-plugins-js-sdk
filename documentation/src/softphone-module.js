export function onRouteDidUpdate({ location }) {
  // We have to call `initButtons` each time a user goes to the `softphone-example` page.
  if (location.pathname.indexOf('softphone/examples') !== -1) {
    initButtons();
  } else if (typeof removeSoftphone != 'undefined') {
    removeSoftphone();
  }
}

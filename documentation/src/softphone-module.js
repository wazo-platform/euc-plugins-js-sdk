export function onRouteDidUpdate({ location, previousLocation }) {
  // Don't update if hash have changed, but still same page
  if(location.pathname === previousLocation?.pathname) {
    return;
  }

  // We have to call `initButtons` each time a user goes to the `softphone-example` page.
  if (location.pathname.indexOf('softphone/examples') !== -1) {
    initButtons();
  } else if (typeof removeSoftphone != 'undefined') {
    removeSoftphone();
  }
}

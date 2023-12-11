---
displayed_sidebar: deeplinkSidebar
---

# Deep Linking

Deep linking enables direct navigation to specific in-app content or actions, enhancing user experience. It allows users to seamlessly access relevant app pages or features via links, improving engagement and user retention.

## Web Application

You now have the ability to control your Wazo application externally using URLs, the same way you would a regular website. If you're whitelabel-ling the application, you can use your own protocol.

For instance, you can access:
- the conference list with `https://app.wazo.io/phonebook/conferences`
- the meetings page with `https://app.wazo.io/meetings`
Navigate the web application in order to retrieve the URLs you'd like to link to from the location bar of your browser.

### Pre-filling the host name
By adding the `host` parameter to a Web Application link, the stack hostname will be pre-filled, like: `app.wazo.io/?host=my-stack.io`.

## Desktop Application

You can also control Wazo Desktop in a similar fashion.

Instead of using `https://app.wazo.io`, you may use the `wazo://` protocol.

For instance, you can access:
- the conference list with `wazo://phonebook/conferences`
- the meetings page with `wazo://meetings`
On your first attempt, you will be prompted to allow access to the application.

Following your approval, you will land on the page directly.

### Pre-filling the host name
By adding the `host` parameter to the Desktop Application link, the stack hostname will be pre-filled, like: `wazo://?host=my-stack.io`.

## Initiating a call

You can also use URLs to initiate a call with the `[protocol]:/calls/[your-number]` URL structure.

For instance:
- `https://app.wazo.io/calls/418-555-1234` loads the web application and redirects you to the lobby, from which you can proceed with the call.
- `wazo://calls/418-555-1234`
will bring the desktop app to the foreground and achieve the same result.

### Bypassing the lobby
You can bypass the lobby and proceed directly with the call by adding the `direct` query string:

- `https://app.wazo.io/calls/418-555-1234?direct`
- `wazo://calls/418-555-1234?direct`
The `tel:`, `call:` and `callto:` protocols automatically bypass the lobby:

- `tel:418-555-1234`
- `call:418-555-1234`
- `callto:418-555-1234` (not implemented yet)
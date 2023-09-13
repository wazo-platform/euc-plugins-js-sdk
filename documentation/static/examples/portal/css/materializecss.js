import app from "https://cdn.jsdelivr.net/npm/@wazo/euc-plugins-sdk@0.0.20/lib/esm/app.js";

const generateWhitelabel = (theme) => {
  if(theme) {
    const primary = theme.palette.primary;
    const secondary = theme.palette.secondary;

    const whiteLabelStyle = document.createElement('style');
    whiteLabelStyle.innerHTML = `
      :root {
        --background-color: #FFF;
        --surface-color: #FCFCFC;
        --error-color: #CF6679;

        --primary-color: ${primary.main};
        --primary-color-dark: ${primary.dark};
        --primary-color-numeric: 200, 200, 200;
        --primary-color-raised-hover-solid: ${primary.mainHover};
        --primary-color-raised-focus-solid: ${primary.mainHover};

        --secondary-color: ${secondary.main};
        --secondary-color-hover-solid: ${secondary.dark};
        --secondary-color-focus-solid: ${secondary.dark};
      }
    `;

    document.getElementsByTagName('head')[0].appendChild(whiteLabelStyle);
  }
}

(async () => {
  await app.initialize();
  const context = app.getContext();
  generateWhitelabel(context?.app?.theme);
})()

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  M.Datepicker.init(elems);

  var elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);
});

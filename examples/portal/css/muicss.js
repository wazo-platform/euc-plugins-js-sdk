import app from 'https://cdn.jsdelivr.net/npm/@wazo/euc-plugins-sdk@0.0.20/lib/esm/app.js';

const applyTheme = (theme) => {
  if (theme) {
    const primary = theme.palette.primary;
    const secondary = theme.palette.secondary;

    const themeStyle = document.createElement('style');

    themeStyle.innerHTML = `
      :root {
        --primary-main: ${primary.main};
        --primary-complementaryMain: ${primary.complementaryMain};
        --primary-mainHover: ${primary.mainHover};
        --primary-light: ${primary.light};
        --primary-dark: ${primary.dark};
        --primary-complementaryDark: ${primary.complementaryDark};
        --primary-contrastText: ${primary.contrastText};

        --secondary-main: ${secondary.main};
        --secondary-light: ${secondary.light};
        --secondary-dark: ${secondary.dark};
        --secondary-contrastText: ${secondary.contrastText};
      }
    `;

    document.getElementsByTagName('head')[0].appendChild(themeStyle);
  }
};

(async () => {
  await app.initialize();
  const context = app.getContext();
  applyTheme(context?.app?.theme);
})();

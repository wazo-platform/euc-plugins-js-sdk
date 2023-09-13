import app from "https://cdn.jsdelivr.net/npm/@wazo/euc-plugins-sdk@0.0.20/lib/esm/app.js";

const generateWhitelabel = (theme) => {
  if(theme) {
    const primary = theme.palette.primary;
    const secondary = theme.palette.secondary;

    const whiteLabelStyle = document.createElement('style');


    whiteLabelStyle.innerHTML = `
      /* Primary */
      .mui-btn--primary, .mui-btn--primary:active, .mui-btn--primary:hover, .mui-btn--primary:focus {
        background-color: ${primary.main};
      }
      .mui-btn.mui-btn--flat.mui-btn--primary { color: ${primary.main}; }

      .mui-tabs__bar>li.mui--is-active { border-bottom-color: ${primary.main}; }
      .mui-tabs__bar>li.mui--is-active>a { color: ${primary.main}; }

      .mui-textfield > input:focus ~ label, .mui-textfield > textarea:focus ~ label { color: ${primary.main}; }
      .mui-textfield > input:focus, .mui-textfield > textarea:focus { border-bottom-color: ${primary.main}; }

      /* Accent */
      .mui-btn--accent, .mui-btn--accent:active, .mui-btn--accent:hover, .mui-btn--accent:focus {
        background-color: ${secondary.main};
      }
      .mui-btn.mui-btn--flat.mui-btn--accent { color: ${secondary.main}; }
    `;

    document.getElementsByTagName('head')[0].appendChild(whiteLabelStyle);
  }
}

(async () => {
  await app.initialize();
  const context = app.getContext();
  generateWhitelabel(context?.app?.theme);
})()

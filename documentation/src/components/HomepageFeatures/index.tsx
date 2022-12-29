import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  link: string,
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Web and Desktop application',
    Svg: require('@site/static/img/wda.svg').default,
    link: '/docs/web-desktop-application.md',
    description: (
      <>
        Add tabs, icons, new pages and lot of new feature to your Web and Desktop app.
        EUC plugin SDK allows you to take control of your Web and Desktop app.
      </>
    ),
  },{
    title: 'Mobile application',
    Svg: require('@site/static/img/mobile.svg').default,
    link: '/docs/mobile.md',
    description: (
      <>
        Create new tab to display your onw contact and pilot the Wazo Mobile Application.
      </>
    ),
  },{
    title: 'Portal',
    Svg: require('@site/static/img/portal.svg').default,
    link: '/docs/portal.md',
    description: (
      <>
        Customize the Wazo Portal to add new tabs and menu items. Add your own dashboard and add more values to your clients.
      </>
    ),
  }
];

function Feature({ title, Svg, description, link }: FeatureItem) {
  return (
    <a className={`${clsx('col col--4')} ${styles.feature}`} href={link}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </a>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

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
    link: './docs/plugins/web-desktop-application',
    description: (
      <>
        Add tabs, icons, new pages and lot of new feature to your Web and Desktop app.
        E-UC plugin SDK allows you to take control of your Web and Desktop app.
      </>
    ),
  },{
    title: 'Mobile application',
    Svg: require('@site/static/img/mobile.svg').default,
    link: './docs/plugins/mobile',
    description: (
      <>
        Create new tab to display your own contact and pilot the Wazo Mobile Application.
      </>
    ),
  },{
    title: 'Portal',
    Svg: require('@site/static/img/portal.svg').default,
    link: './docs/plugins/portal',
    description: (
      <>
        Customize the Wazo Portal to add new tabs and menu items. Add your own dashboard and add more values to your clients.
      </>
    ),
  },
  {
    title: 'Softphone',
    Svg: require('@site/static/img/softphone.svg').default,
    link: './docs/softphone/introduction',
    description: (
      <>
        Enhance your application with a Softphone that you can embed and control with ease.
      </>
    ),
  }
];

function Feature({ title, Svg, description, link }: FeatureItem) {
  return (
    <a className={`${clsx('col col--6')} ${styles.feature}`} href={link}>
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
          {FeatureList.map((props, idx) => <Feature key={idx} {...props} />)}
        </div>
      </div>
    </section>
  );
}

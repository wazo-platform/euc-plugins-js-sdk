import React from 'react';

interface Props {
  source?: string;
  manifest?: string;
  product?: 'portal' | 'app';
  url: string;
}

const PRODUCT_URLS = {
  portal: 'https://portal.wazo.io/?manifestUrl=',
  app: 'https://app.wazo.io/?manifestUrl=',
}

export default function ButtonTrySource({
  source,
  manifest,
  product
}: Props): JSX.Element {
  const showSource: boolean = !!source;
  const showExample: boolean = !!manifest && !!product;

  if(!showSource && !showExample) {
    return null;
  }

  const productUrl: string = PRODUCT_URLS[product]+manifest;

  return (
    <div className="button-group button-group--block">
      { showExample && <a className="button button--primary button--lg" href={productUrl} target="_blank">👀 TRY IT</a> }
      { showSource && <a className="button button--secondary button--lg" href={source} target="_blank">⚙️ VIEW SOURCE</a> }
    </div>
  );
}

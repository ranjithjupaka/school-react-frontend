import { Helmet } from 'react-helmet';

const APP_NAME = 'School App'

const Meta = () => {
  return (
    <Helmet>
      <title>School App</title>
      <meta name='description' content='School App' />
      <meta name='application-name' content={APP_NAME} />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content={APP_NAME} />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='theme-color' content='#FFFFFF' />

      <link rel='shortcut icon' href='/icon.svg' />
    </Helmet>
  )
}

export default Meta;

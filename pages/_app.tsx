import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Script from 'next/script';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>TON</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Script
        src="https://telegram.org/js/telegram-widget.js?21"
        data-telegram-login="Kartel_app_bot" data-size="medium" data-radius="10" data-onauth="onTelegramAuth(user)" data-request-access="write"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("Telegram auth script loaded")
          function onTelegramAuth(user: any) {
            alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
          };
        }
        }
      />



      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>

        <NotificationsProvider position="bottom-left">
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
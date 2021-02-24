import Head from 'next/head';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>move.it</title>
        <meta
          name="description"
          content="Web site created using create-next-app"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

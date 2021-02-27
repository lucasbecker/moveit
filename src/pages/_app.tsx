import Head from 'next/head';

import { ChallengesProvider } from '../contexts/ChallengesContext';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>moveit</title>
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

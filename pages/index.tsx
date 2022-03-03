import Head from 'next/head'
import Header from '@/components/Header'
export default function Home() {
  return (
    <div >
      <Head>
        <title>InitProject</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header  */}
      <main >
        <Header/>
        Welcome.
      </main>

     
    </div>
  )
}

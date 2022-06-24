// @ts-nocheck
import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script';
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
        {/* <script src="https://connect.facebook.net/en_US/sdk.js" /> */}
      </Head>
      <Script
        src='https://connect.facebook.net/en_US/sdk.js'
        strategy='lazyOnload' // 控制何时加载第三方脚本
        onLoad={() => console.log(`script`)} // 脚本完成加载后立即运行任何js代码
      />
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <img src="/images/profile.png" alt="" />
    </Layout>
  )
}
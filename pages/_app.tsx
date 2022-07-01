import { AppProps } from 'next/app';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';

import '../styles/global.css';
import 'antd/dist/antd.css'
import Test from 'components/test';

export default function App({ Component, pageProps}: AppProps) {
  const router = useRouter();
  const [currentHref, setCurrentHref] = useState<string>('/')

  const routerArray = [
    {
      path: '/',
      pathName: 'Home',
    },
    {
      path: '/connect',
      pathName: 'Connect',
    },
    {
      path: '/keypair',
      pathName: 'Keypair',
    },
    {
      path: '/fund',
      pathName: 'Fund',
    },
  ]
  const style = {
    marginRight: '20px',
  }
  return(
    <>
      <div>
        {routerArray.map(router => {
          return (
            <Link href={router.path} key={router.path}>
              <a style={style} onClick={() => setCurrentHref(router.path)}>{router.pathName}</a>
            </Link>
          )
        })}
      </div>
        <Provider  store={store}>
          <Test></Test>
          <Component { ...pageProps } />
        </Provider>
    </> 
  )
}
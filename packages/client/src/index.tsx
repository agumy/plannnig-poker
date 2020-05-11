import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { SocketProvider } from './context/SocketContext'
import { Header } from './components/organisms/Header'

import 'antd/dist/antd.less'

const { Content } = Layout
const Start = React.lazy(() => import('./components/Pages/Start'))
const Play = React.lazy(() => import('./components/Pages/Play'))

const GlobalStyle = createGlobalStyle`
  #root {
    height: 100%;
  }
`

const _App: React.FCX = (props) => {
  return (
    <Router>
      <SocketProvider>
        <Layout className={props.className}>
          <Header />
          <Content className="container">
            <Switch>
              <Route path="/" exact>
                <React.Suspense fallback={<div>now loading...</div>}>
                  <Start />
                </React.Suspense>
              </Route>
              <Route path="/play">
                <React.Suspense fallback={<div>now loading...</div>}>
                  <Play />
                </React.Suspense>
              </Route>
            </Switch>
          </Content>
        </Layout>
        <GlobalStyle />
      </SocketProvider>
    </Router>
  )
}

const App = styled(_App)`
  height: 100%;

  .container {
    height: 100%;
  }
`

const root = document.getElementById('root')

ReactDOM.render(<App />, root)

import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from '@commitd/components'
import { Root, Header, Nav, Content, Footer } from '../dist'

const App = () => (
  <ThemeProvider>
    <Root style={{ minHeight: '100vh' }}>
      <Header>Header</Header>
      <Nav
        header={
          // you can provide fixed header inside nav
          // change null to some react element
          ctx => null
        }
      >
        Nav
      </Nav>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Root>
  </ThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))

import React from 'react'
import { Root, Header, Nav, Content, Footer } from '../src'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'

export default {
  title: 'Welcome'
}

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = () => (
  <ThemeProvider theme={createMuiTheme()}>
    <Root
      style={{ minHeight: '100vh' }}
      config={
        {
          // adjust behavior here!
          // See LayoutConfig
        }
      }
    >
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

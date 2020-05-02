import React from 'react'
import { Root, Header, Nav, Content, Footer } from '../src'
import {
  ThemeProvider,
  createMuiTheme,
  Typography,
  IconButton,
  Box,
  Container,
  makeStyles,
  Theme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import {
  withKnobs,
  text,
  boolean,
  number,
  select
} from '@storybook/addon-knobs'
import { Variant, Orientation } from '../src/util'

export default {
  title: 'Example',
  decorators: [withKnobs]
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    background: theme.palette.background.default
  }
}))

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = () => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={createMuiTheme()}>
      <Root
        style={{ minHeight: '100vh' }}
        config={{
          clipped: boolean('clipped', false),
          collapsedWidth: number('collapsedWidth', 64, {
            range: true,
            min: 0,
            max: 512,
            step: 1
          }),
          collapsible: boolean('collapsible', true),
          footerShrink: boolean('footerShrink', true),
          headerPosition: 'relative',
          navAnchor: select(
            'navAnchor',
            {
              left: 'left',
              right: 'right'
            },
            'left'
          ) as Orientation,
          navVariant: select(
            'navVariant',
            {
              permanent: 'permanent',
              temporary: 'temporary',
              persistent: 'persistent'
            },
            'permanent'
          ) as Variant,
          navWidth: number('navWidth', 256, {
            range: true,
            min: 0,
            max: 512,
            step: 1
          }),
          squeezed: false
        }}
      >
        <Header>
          <Typography variant="h5">Application Name</Typography>
          <Box flexGrow={1} />
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Header>
        <Nav
          header={
            // you can provide fixed header inside nav
            // change null to some react element
            ctx => null
          }
        >
          <List>
            <ListItem button>
              <ListItemIcon>{<AccountCircle />}</ListItemIcon>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>{<AccountCircle />}</ListItemIcon>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>{<AccountCircle />}</ListItemIcon>
              <ListItemText primary="Menu Item 3" />
            </ListItem>
          </List>
        </Nav>
        <Content className={classes.content}>
          <Container maxWidth="lg">
            <Box pt={2}>
              <Box mb={2}>
                <Typography variant="h4">@committed/layout</Typography>
              </Box>
              <Typography variant="body1">
                Use the knobs tab below to try out different props!
              </Typography>
            </Box>
          </Container>
        </Content>
        <Footer>
          <Box p={2}>
            <Typography>Footer</Typography>
          </Box>
        </Footer>
      </Root>
    </ThemeProvider>
  )
}

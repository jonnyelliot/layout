import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

export type Variant = 'permanent' | 'persistent' | 'temporary'

export type Position = 'static' | 'relative' | 'sticky' | 'fixed' | 'absolute'

export type Orientation = 'left' | 'right'

export type ScreenProps<P> = Partial<Record<Breakpoint, P>>

export interface Layout {
  clipped: boolean
  collapsible: boolean
  collapsedWidth: number
  collapsed: boolean
  footerShrink: boolean
  navAnchor: Orientation
  navVariant: Variant
  navWidth: number
  headerPosition: Position
  open: boolean
  squeezed: boolean
  setCollapsed: (val: any) => any
  setOpen: (val: any) => any
}

export interface LayoutConfig {
  /**
   * clipped, moves the header over the top of the navigation drawer
   * unclipped makes navigation full height
   */
  clipped: boolean | ScreenProps<boolean>
  /**
  * Can the navigation be collapsed to a smalled form
  */
  collapsible: boolean | ScreenProps<boolean>
  /**
   * Width of the collapsed navigation
   */
  collapsedWidth: number | ScreenProps<number>
  /**
   * Footer to adjust the size to fit when nav expanded,
   * set false to keep the same width and overflow the screen.
   */
  footerShrink: boolean | ScreenProps<boolean>
  /**
   * Which side of the screen to show the nav panel
   */
  navAnchor: Orientation | ScreenProps<Orientation>
  /**
  * Navigation variant:
  * - permanent: stays all the time
  * - persistent: remains open but can be hidden with button
  * - temporary: hides on click away (and selection)
  */
  navVariant: Variant | ScreenProps<Variant>
  /**
  * Width of the navigation drawer
  */
  navWidth: number | ScreenProps<number>
  /**
   * Popsition applied to the AppBar header
   * one of 'static', 'relative', 'sticky', 'fixed', 'absolute'
   * See https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning
   */
  headerPosition: Position | ScreenProps<Position>
  /**
   * Both header and content adjust the size to fit when nav expanded,
   * set false to keep the same width and overflow the screen.
   */
  squeezed: boolean | ScreenProps<boolean>
}

const presets = {
  defaultContext(): Layout {
    return {
      clipped: false,
      collapsible: true,
      collapsedWidth: 64,
      collapsed: false,
      footerShrink: true,
      navAnchor: 'left',
      navVariant: 'permanent',
      open: true,
      navWidth: 256,
      headerPosition: 'relative',
      squeezed: true,
      setCollapsed: () => null,
      setOpen: () => null
    }
  },
  createDefaultLayout(): LayoutConfig {
    return {
      clipped: false,
      collapsible: {
        xs: false,
        sm: true
      },
      collapsedWidth: 64,
      footerShrink: true,
      navAnchor: 'left',
      navVariant: {
        xs: 'temporary',
        sm: 'permanent'
      },
      navWidth: 256,
      headerPosition: 'relative',
      squeezed: true
    }
  },
  createFixedLayout: (config: LayoutConfig) => ({
    ...presets.createDefaultLayout(),
    navVariant: {
      xs: 'temporary',
      md: 'permanent'
    },
    collapsible: {
      xs: false,
      md: true
    },
    clipped: true,
    squeezed: true,
    headerPosition: 'sticky',
    ...config
  }),
  createContentBasedLayout: (config: LayoutConfig) => ({
    ...presets.createDefaultLayout(),
    navWidth: {
      sm: 200,
      md: 256
    },
    navVariant: {
      xs: 'temporary',
      sm: 'persistent'
    },
    collapsible: false,
    ...config
  }),
  createCozyLayout: (config: LayoutConfig) => ({
    ...presets.createDefaultLayout(),
    navVariant: {
      xs: 'persistent',
      sm: 'permanent'
    },
    navWidth: {
      sm: 200,
      md: 256,
      xs: 64
    },
    collapsible: {
      xs: false,
      sm: true
    },
    clipped: false,
    ...config
  }),
  createMuiTreasuryLayout: (config: LayoutConfig) => ({
    ...presets.createDefaultLayout(),
    navWidth: 200,
    navVariant: {
      xs: 'temporary',
      md: 'permanent'
    },
    clipped: true,
    collapsible: false,
    ...config
  })
}

const keys: Array<Breakpoint> = ['xs', 'sm', 'md', 'lg', 'xl']

export function getScreenValue<S>(
  currentScreen: Breakpoint,
  config: S | ScreenProps<S> | undefined,
  defaultValue: S | ScreenProps<S>
): S {
  let val = config
  if (val === null || val === undefined) {
    val = defaultValue
  }
  if (typeof val !== 'object') {
    return val
  }
  const screenMap: ScreenProps<S> = val
  let index = keys.indexOf(currentScreen)
  while (index >= 0) {
    if (screenMap[keys[index]] !== undefined) {
      return screenMap[keys[index]] as S
    }
    index -= 1
  }
  throw Error('Config not valid')
}

export default presets

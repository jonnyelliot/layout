import React, { useContext, ReactNode } from 'react'
import { LayoutContext } from './Root'
import { Theme, makeStyles } from '@commitd/components'

export interface FooterProps {
  className?: string
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>
  style?: React.CSSProperties
  children?: ReactNode
}

const useStyles = makeStyles<Theme>(
  ({ breakpoints, palette, spacing, transitions }) => ({
    root: {
      borderTop: '1px solid',
      borderColor: palette.grey[200],
      background: palette.secondary.main,
      color: palette.secondary.contrastText,
      padding: spacing(2),
      [breakpoints.up('sm')]: {
        padding: spacing(3)
      },
      transition: transitions.create(['margin'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen
      })
    }
  })
)

const Footer = ({
  className = '',
  component: Component = 'footer',
  style = {},
  ...props
}: FooterProps) => {
  const classes = useStyles()
  const ctx = useContext(LayoutContext)
  const {
    navVariant,
    navWidth,
    collapsible,
    collapsed,
    collapsedWidth,
    footerShrink,
    open,
    navAnchor
  } = ctx
  const getMargin = () => {
    if (navAnchor !== 'left' || !footerShrink) return 0
    if (navVariant === 'persistent' && open) {
      // open is effect only when
      // navVariant === 'persistent' ||
      // navVariant === 'temporary'
      return navWidth
    }
    if (navVariant === 'permanent') {
      if (collapsible) {
        if (collapsed) return collapsedWidth
        return navWidth
      }
      return navWidth
    }
    return 0
  }
  return (
    <Component
      {...props}
      className={`${className} ${classes.root}`}
      style={{
        ...style,
        marginLeft: getMargin()
      }}
    />
  )
}

export default Footer

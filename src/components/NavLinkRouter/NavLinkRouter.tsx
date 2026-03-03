import { forwardRef } from 'react'
import { NavLink as RouterNavLink, type NavLinkProps as RouterNavLinkProps } from 'react-router-dom'
import { cn } from '../../utils/cn'

export interface NavLinkRouterProps extends Omit<RouterNavLinkProps, 'className'> {
  className?: string
  activeClassName?: string
  pendingClassName?: string
}

export const NavLinkRouter = forwardRef<HTMLAnchorElement, NavLinkRouterProps>(
  ({ className, activeClassName, pendingClassName, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    )
  }
)

NavLinkRouter.displayName = 'NavLinkRouter'

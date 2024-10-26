
import type { PathRouteProps } from 'react-router-dom'
import Home from '../pages/home'

import Groups from '../pages/groups'
import ComposeEmail from '../pages/compose-email'
import SentEmail from '../pages/sent-email'

export const publicRoutes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  }
]

export const privateRoutes: Array<PathRouteProps> = [
  {
    path: '/groups',
    element: <Groups />,
  },
  {
    path: '/compose-email',
    element: <ComposeEmail />,
  },
  {
    path: '/sent-email',
    element: <SentEmail />,
  },
]

import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import RequireAuth from '@/lib/components/auth/RequireAuth'
import Page404 from '@/lib/pages/404'

import { privateRoutes, publicRoutes } from './routes'
import PublicRoute from './PublicLayout'

const Routings = () => {
  return (
    <Suspense>
      <Routes>
        {publicRoutes.map((routeProps) => (
          <Route
            {...routeProps}
            key={`publicRoute-${routeProps.path}`}
            element={<PublicRoute>{routeProps.element}</PublicRoute>}
          />
        ))}
        {privateRoutes.map(({ element, ...privateRouteProps }) => (
          <Route
            element={<RequireAuth redirectTo={`/`}>{element}</RequireAuth>}
            {...privateRouteProps}
            key={`privateRoute-${privateRouteProps.path}`}
          />
        ))}
        <Route path='*' element={<Page404 />} />
      </Routes>
    </Suspense>
  )
}

export default Routings

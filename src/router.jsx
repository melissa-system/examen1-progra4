import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'

import Home from './pages/Home'
import CarParts from './pages/CarParts'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const rootRoute = createRootRoute({
  component: function RootLayout() {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    )
  }
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const carPartsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/carparts',
  component: CarParts,
})

const routeTree = rootRoute.addChildren([homeRoute, carPartsRoute])
export const router = createRouter({ routeTree })
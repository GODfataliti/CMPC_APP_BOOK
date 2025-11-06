import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import type { Root } from 'react-dom/client'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { ENV } from '@/config';
import { reportWebVitals } from '@/utils'
import './styles.css'

console.log(`Site version: ${ENV.VITE_VERSION}`);


// -- Routing
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: false,
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


// -- Render.
const container = document.getElementById('app')!

const root: Root = createRoot(container);
root.render(
  <StrictMode>
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
);

export { router };

// DOCS: https://create-react-app.dev/docs/measuring-performance/
reportWebVitals();

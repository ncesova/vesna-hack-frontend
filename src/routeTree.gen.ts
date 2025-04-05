/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignUpImport } from './routes/sign-up'
import { Route as SignInImport } from './routes/sign-in'
import { Route as ActsImport } from './routes/acts'
import { Route as IndexImport } from './routes/index'
import { Route as AnalyzeIdImport } from './routes/analyze.$id'

// Create/Update Routes

const SignUpRoute = SignUpImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => rootRoute,
} as any)

const SignInRoute = SignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const ActsRoute = ActsImport.update({
  id: '/acts',
  path: '/acts',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AnalyzeIdRoute = AnalyzeIdImport.update({
  id: '/analyze/$id',
  path: '/analyze/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/acts': {
      id: '/acts'
      path: '/acts'
      fullPath: '/acts'
      preLoaderRoute: typeof ActsImport
      parentRoute: typeof rootRoute
    }
    '/sign-in': {
      id: '/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInImport
      parentRoute: typeof rootRoute
    }
    '/sign-up': {
      id: '/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof SignUpImport
      parentRoute: typeof rootRoute
    }
    '/analyze/$id': {
      id: '/analyze/$id'
      path: '/analyze/$id'
      fullPath: '/analyze/$id'
      preLoaderRoute: typeof AnalyzeIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/acts': typeof ActsRoute
  '/sign-in': typeof SignInRoute
  '/sign-up': typeof SignUpRoute
  '/analyze/$id': typeof AnalyzeIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/acts': typeof ActsRoute
  '/sign-in': typeof SignInRoute
  '/sign-up': typeof SignUpRoute
  '/analyze/$id': typeof AnalyzeIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/acts': typeof ActsRoute
  '/sign-in': typeof SignInRoute
  '/sign-up': typeof SignUpRoute
  '/analyze/$id': typeof AnalyzeIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/acts' | '/sign-in' | '/sign-up' | '/analyze/$id'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/acts' | '/sign-in' | '/sign-up' | '/analyze/$id'
  id: '__root__' | '/' | '/acts' | '/sign-in' | '/sign-up' | '/analyze/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ActsRoute: typeof ActsRoute
  SignInRoute: typeof SignInRoute
  SignUpRoute: typeof SignUpRoute
  AnalyzeIdRoute: typeof AnalyzeIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ActsRoute: ActsRoute,
  SignInRoute: SignInRoute,
  SignUpRoute: SignUpRoute,
  AnalyzeIdRoute: AnalyzeIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/acts",
        "/sign-in",
        "/sign-up",
        "/analyze/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/acts": {
      "filePath": "acts.tsx"
    },
    "/sign-in": {
      "filePath": "sign-in.tsx"
    },
    "/sign-up": {
      "filePath": "sign-up.tsx"
    },
    "/analyze/$id": {
      "filePath": "analyze.$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */

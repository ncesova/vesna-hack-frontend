import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/knowledge-base')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/knowledge-base"!</div>
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/acts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/acts"!</div>
}

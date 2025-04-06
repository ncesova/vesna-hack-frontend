import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_mainLayout")({
  // beforeLoad: async ({ context: { queryClient } }) => {
  //   try {
  //     await queryClient.ensureQueryData(userAuthOptions());
  //   } catch {
  //     throw redirect({
  //       to: "/auth",
  //     });
  //   }
  // },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}

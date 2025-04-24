// This file configures which routes should be statically generated
// An empty array means no static paths will be pre-rendered
// which helps avoid the entryCSSFiles error

export const dynamicParams = true;

export function generateStaticParams() {
  // Return an empty array to avoid static generation of any routes under /dashboard/client
  // This will make all routes under /dashboard/client be rendered on-demand
  return [];
}

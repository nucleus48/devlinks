import DeviceMockup from "@/components/device-mockup";
import Header from "@/components/header";
import LinksProvider from "@/features/links/providers/links-provider";
import { getUser } from "@/lib/dal";

export default async function MainLayout({
  children,
}: React.PropsWithChildren) {
  const { links } = await getUser();

  return (
    <div className="container mx-auto h-screen flex flex-col">
      <div className="sm:p-6 sm:pb-0">
        <Header />
      </div>
      <div className="flex flex-1 *:flex-1 p-4 gap-6 sm:p-6 lg:overflow-hidden">
        <LinksProvider links={links || []}>
          <div className="hidden max-w-[560px] lg:flex bg-white rounded-lg items-center justify-center p-6">
            <DeviceMockup />
          </div>
          <main className="bg-white rounded-lg w-full overflow-auto">
            {children}
          </main>
        </LinksProvider>
      </div>
    </div>
  );
}

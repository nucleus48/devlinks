import DeviceMockup from "@/components/device-mockup";
import Header from "@/components/header";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="container mx-auto min-h-screen grid [grid-template-rows:_auto_1fr]">
      <div className="sm:p-6 sm:pb-0">
        <Header />
      </div>
      <div className="flex *:flex-1 p-4 gap-6 sm:p-6">
        <div className="hidden max-w-[560px] lg:flex bg-white rounded-lg items-center justify-center p-6">
          <DeviceMockup />
        </div>
        <main className="bg-white rounded-lg w-full">{children}</main>
      </div>
    </div>
  );
}

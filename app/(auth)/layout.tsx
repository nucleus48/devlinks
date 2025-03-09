import DevlinksLarge from "@/components/icons/devlinks-large";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-white p-8 min-h-screen flex flex-col sm:items-center sm:justify-center space-y-16 sm:bg-muted">
      <DevlinksLarge />
      <main className="bg-white rounded-lg w-full sm:p-10 sm:max-w-[476px]">
        {children}
      </main>
    </div>
  );
}

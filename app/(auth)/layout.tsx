import Image from "next/image";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-white p-8 min-h-screen flex flex-col sm:items-center sm:justify-center space-y-16 sm:bg-muted">
      <Image
        src="/images/logo-devlinks-large.svg"
        width={183}
        height={40}
        alt="dev links large logo"
      />
      <main className="bg-white rounded-lg w-full sm:p-10 sm:max-w-[476px]">
        {children}
      </main>
    </div>
  );
}

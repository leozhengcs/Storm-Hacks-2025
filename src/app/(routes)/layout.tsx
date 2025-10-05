import Navbar from "@/app/components/Navbar";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="px-12 py-5">{children}</div>
    </>
  );
}

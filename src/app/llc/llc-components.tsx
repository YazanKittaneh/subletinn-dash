import { LlcInfo } from "./llc-data";

interface LlcHeaderProps {
  title: string;
}

export function LlcHeader({ title }: LlcHeaderProps) {
  return (
    <h1 className="text-3xl font-bold mb-4">
      {title}
    </h1>
  );
}

interface LlcPageLayoutProps {
  children: React.ReactNode;
}

export function LlcPageLayout({ children }: LlcPageLayoutProps) {
  return (
    <div className="container mx-auto py-8">
      {children}
    </div>
  );
}

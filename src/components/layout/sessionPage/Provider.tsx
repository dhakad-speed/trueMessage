import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}
function ProviderContainerForSession({ children }: ProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default ProviderContainerForSession;

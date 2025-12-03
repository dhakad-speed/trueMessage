import Login from "@/src/components/layout/LoginPage/Login";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default function page() {
  (async () => {
    const session = await auth();
    if (session) {
      redirect("/dashboard");
    } else {
      redirect("/register");
    }
  })();
  return <Login />;
}

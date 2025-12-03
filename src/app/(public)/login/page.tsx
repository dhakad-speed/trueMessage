import Login from "@/src/components/layout/LoginPage/Login";
// import { auth } from "@/auth";
// import { redirect } from "next/navigation";

export default async function Page() {
  // const session = await auth();

  // if (session) {
  //   redirect("/dashboard");
  // }

  return <Login />;
}

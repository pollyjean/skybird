import Link from "next/link";
import LoginForm from "./LoginForm";

const Page = async () => {
  return (
    <>
      <h1 className="text-2xl font-bold">Login</h1>
      <LoginForm />
      <Link
        href="/create-account"
        className="hover:underline hover:underline-offset-2"
      >
        Have no account? create account &rarr;
      </Link>
    </>
  );
};

export default Page;

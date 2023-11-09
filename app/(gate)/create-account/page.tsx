import AccountForm from "./AccountForm";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">Create Account</h1>
      <AccountForm />
      <Link href="/log-in" className="hover:underline hover:underline-offset-2">
        Have an account? Log in here &rarr;
      </Link>
    </>
  );
};
export default Page;

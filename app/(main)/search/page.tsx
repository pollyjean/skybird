import { cls } from "@/utils";
import { TAIL } from "@/constants";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

const Page = () => {
  return (
    <>
      <h1 className={cls(TAIL.pageTitle)}>Search</h1>
      <SearchForm />
      <SearchResults />
    </>
  );
};

export default Page;

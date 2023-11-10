import Link from "next/link";
const Menu = () => {
  return (
    <nav>
      <menu>
        <li>
          <Link href="/new">New</Link>
        </li>
        <li>
          <Link href="/">Tweets</Link>
        </li>

        <li>
          <Link href="/search">Search</Link>
        </li>

        <li>
          <Link href="/profile">Profile</Link>
        </li>

        <li>
          <Link href="/log-out">Log out</Link>
        </li>
      </menu>
    </nav>
  );
};

export default Menu;

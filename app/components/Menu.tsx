import Link from "next/link";
const Menu = () => {
  return (
    <nav>
      <menu>
        <li>
          <Link href="/">Posts</Link>
        </li>

        <li>
          <Link href="/search">Search</Link>
        </li>

        <li>
          <Link href="/log-out">Profile</Link>
        </li>
      </menu>
    </nav>
  );
};

export default Menu;

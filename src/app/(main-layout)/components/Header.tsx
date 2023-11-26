import css from './Header.module.css';
import Link from "next/link";

const Header = () => {
    return (
        <div className={css.Header}>
            <Link href={'/posts'}>Posts</Link>
            <Link href={'/users'}>Users</Link>
        </div>
    );
};

export default Header;
import Link from "next/link"
import styles from "./footer.module.css"
import packageJSON from "../package.json"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          {/*<Link href="/policy">*/}
          {/*  <a>Policy</a>*/}
          {/*</Link>*/}
            <i> TeamNameNotFound </i>
        </li>
        {/*<li className={styles.navItem}>*/}
        {/*  <em>next-auth@{packageJSON.dependencies["next-auth"]}</em>*/}
        {/*</li>*/}
      </ul>
    </footer>
  )
}

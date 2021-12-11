import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"
import { Navbar } from "react-bootstrap";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>

      <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbarsExample07XU">
        <div className="container-xxl">
          <Link href="/">
            <a className="navbar-brand">Game Forum</a>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07XU" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
          <ul className={styles.navItems}  className="navbar-nav mr-auto">

            <li className={styles.navItem} className="nav-item">
              <Link href="/me">
                <a className="nav-link">My Profile</a>
              </Link>
            </li>
            <li className={styles.navItem} className="nav-item">
              <Link href="/forums">
                <a className="nav-link">Forums</a>
              </Link>
            </li>
            <li className={styles.navItem} className="nav-item">
              <Link href="/games">
                <a className="nav-link">Games</a>
              </Link>
            </li>
          </ul>
          </div>
        </div>
      </Navbar>
    </header>
  )
}

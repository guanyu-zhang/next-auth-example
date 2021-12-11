import Header from '../components/header'
import Footer from '../components/footer'

export default function Layout ({children}) {
  return (
    <>
      <Header/>
      <main role="main" className="container-xxl align-middle">
        <div className="album py-5 bg-light text-center align-middle">
          <div className="container-xxl text-center align-middle">
            {children}
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

export default function AppLayout({ children }) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

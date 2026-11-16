import { useShowcase } from '../../context/ShowcaseContext'
import { About } from '../About'
import { Demos } from '../Demos'
import { Experience } from '../Experience'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { Hero } from '../Hero'
import { Journey } from '../Journey'
import { MediaDialog } from '../MediaDialog'
import { Research } from '../Research'
export const App = () => {
  const { c } = useShowcase()
  return (
    <>
      <a className="skip-link" href="#main">
        {c.skip}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Journey />
        <Experience />
        <Demos />
        <Research />
        <About />
      </main>
      <Footer />
      <MediaDialog />
    </>
  )
}

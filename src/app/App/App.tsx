import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { MediaDialog } from '../../components/media/MediaDialog'
import { About } from '../../components/sections/About'
import { Demos } from '../../components/sections/Demos'
import { Experience } from '../../components/sections/Experience'
import { Hero } from '../../components/sections/Hero'
import { Journey } from '../../components/sections/Journey'
import { Research } from '../../components/sections/Research'
import { useShowcase } from '../../contexts/ShowcaseContext'
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

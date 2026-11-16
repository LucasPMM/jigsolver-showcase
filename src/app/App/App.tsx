import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { MediaDialog } from '../../components/media/MediaDialog'
import { About } from '../../components/sections/About'
import { Demos } from '../../components/sections/Demos'
import { Experience } from '../../components/sections/Experience'
import { Hero } from '../../components/sections/Hero'
import { Journey } from '../../components/sections/Journey'
import { Photographed } from '../../components/sections/Photographed'
import { Pressable } from '../../components/ui/Pressable'
import { useShowcase } from '../../contexts/ShowcaseContext'
export const App = () => {
  const { c } = useShowcase()
  return (
    <>
      <Pressable className="skip-link" href="#main">
        {c.skip}
      </Pressable>
      <Header />
      <main id="main">
        <Hero />
        <Journey />
        <Experience />
        <Demos />
        <Photographed />
        <About />
      </main>
      <Footer />
      <MediaDialog />
    </>
  )
}

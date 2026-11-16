import { render } from 'preact'
import { App } from './app/App'
import { ShowcaseProvider } from './contexts/ShowcaseContext'
import './styles/fonts.css'
import './styles/style.css'
const root = document.getElementById('app')
if (!root) {
  throw new Error('Missing application root')
}
render(
  <ShowcaseProvider>
    <App />
  </ShowcaseProvider>,
  root
)

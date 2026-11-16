import { render } from 'preact'
import { App } from './components/App'
import { ShowcaseProvider } from './context/ShowcaseContext'
import './fonts.css'
import './style.css'
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

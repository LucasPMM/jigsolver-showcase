import { useShowcase } from '../../../contexts/ShowcaseContext'
import { Icon } from '../../ui/Icon'
import { Pressable } from '../../ui/Pressable'

export const Header = () => {
  const { lang, theme, setTheme, menu, setMenu, c, anchors, language } =
    useShowcase()

  return (
    <header className="header">
      <div className="nav-wrap">
        <a className="brand" href="#top" aria-label="JigSolver">
          <span className="brand-mark">
            <Icon name="puzzle" size={23} />
          </span>
          JigSolver<span className="brand-dot">.</span>
        </a>
        <nav
          className={menu ? 'navigation open' : 'navigation'}
          aria-label={lang === 'en' ? 'Main navigation' : 'Navegação principal'}
        >
          {c.nav.map((name, i) => (
            <a
              href={`#${anchors[i]}`}
              onClick={() => setMenu(false)}
              key={name}
            >
              {name}
            </a>
          ))}
        </nav>
        <div className="preferences">
          <fieldset className="language" aria-label={c.language}>
            <Pressable
              type="button"
              aria-label="Português (Brasil)"
              title="Português (Brasil)"
              onClick={() => language('pt-BR')}
              aria-pressed={lang === 'pt-BR'}
            >
              <span aria-hidden="true">🇧🇷</span>
            </Pressable>

            <Pressable
              type="button"
              aria-label="English"
              title="English"
              onClick={() => language('en')}
              aria-pressed={lang === 'en'}
            >
              <span aria-hidden="true">🇺🇸</span>
            </Pressable>
          </fieldset>
          <Pressable
            type="button"
            className="icon-button theme-toggle"
            title={`${c.theme}: ${theme === 'system' ? c.system : theme === 'dark' ? c.dark : c.light}`}
            aria-label={`${c.theme}: ${theme === 'system' ? c.system : theme === 'dark' ? c.dark : c.light}. ${lang === 'en' ? 'Change theme' : 'Alterar tema'}`}
            onClick={() =>
              setTheme(
                theme === 'system'
                  ? 'light'
                  : theme === 'light'
                    ? 'dark'
                    : 'system'
              )
            }
          >
            <Icon
              name={
                theme === 'system'
                  ? 'desktop'
                  : theme === 'dark'
                    ? 'moon'
                    : 'sun'
              }
            />
          </Pressable>
          <Pressable
            type="button"
            className="icon-button menu-toggle"
            aria-label={menu ? c.closeMenu : c.menu}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? 'close' : 'menu'} />
          </Pressable>
        </div>
      </div>
    </header>
  )
}

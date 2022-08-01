import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {ThemeSwitcherProvider} from 'react-css-theme-switcher'
import App from './App'
import './index.css'
import {store} from './store/store'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

// load saved theme
const savedTheme = window.localStorage.getItem('theme')

//setup themes for theme switcher
const themes = {
  light: './antd.min.css',
  dark: './antd.dark.min.css',
}

// load graphql client for subgraphs
const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache(),
})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeSwitcherProvider themeMap={themes} defaultTheme={savedTheme || 'light'}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </ThemeSwitcherProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
)

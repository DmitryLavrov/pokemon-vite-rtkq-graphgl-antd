import {Route, Routes} from 'react-router-dom'
import Rest from './pages/Rest'
import Graphql from './pages/Graphql'
import MainMenu from './components/MainMenu'
import {useEffect, useState} from 'react'
import {ThemeSwitcher} from './components/ThemeSwitcher'

function App() {
  const [route, setRoute] = useState<string>('')

  useEffect(() => {
    setRoute(window.location.pathname)
  }, [setRoute])

  return (
    <div className="App">
      <MainMenu  route={route} setRoute={setRoute} />

      <ThemeSwitcher/>

      <Routes>
        <Route path="/" element={<Rest/>}/>
        <Route path="graphql" element={<Graphql/>}/>
      </Routes>
    </div>
  )
}

export default App

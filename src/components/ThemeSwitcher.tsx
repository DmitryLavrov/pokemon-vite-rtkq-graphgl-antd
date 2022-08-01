import {Switch} from 'antd'
import React, {useEffect, useState} from 'react'
import {useThemeSwitcher} from 'react-css-theme-switcher'

const initialTheme = window.localStorage.getItem('theme') ?? 'light'
export const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === 'dark')
  const {switcher, currentTheme, status, themes} = useThemeSwitcher()

  useEffect(() => {
    window.localStorage.setItem('theme', currentTheme ?? '')
    if (currentTheme == 'light' || currentTheme == 'dark') {
      // ethersContext?.setModalTheme?.(currentTheme);
    }
  }, [currentTheme])

  const toggleTheme = (isChecked: boolean) => {
    setIsDarkMode(isChecked)
    switcher({theme: isChecked ? themes.dark : themes.light})
    // ethersContext?.setModalTheme?.(isDarkMode ? 'dark' : 'light');
  }

  if (status === 'loading' || status === 'idle') {
    return null
  }

  return (
    <div style={{position: 'fixed', right: 10, top: 5, display: 'flex', alignItems: 'center'}}>
      <span style={{padding: 8}}>{currentTheme === 'light' ? '😎' : '🌜'}</span>
      <Switch checked={isDarkMode} onChange={toggleTheme}/>
    </div>
  )
}

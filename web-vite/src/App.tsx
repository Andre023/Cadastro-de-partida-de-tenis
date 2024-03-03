import Menu from "./components/menu/Menu"
import './App.css'
import { ThemeProvider } from "./components/menu/ThemeProvider"

const App: React.FC = () => {

  return (
    <div className="App">
      <ThemeProvider>
        <Menu />
      </ThemeProvider>
    </div>
  )
}

export default App

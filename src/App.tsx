import { Provider } from './components/ui/provider'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/app.routes'

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  )
}

export default App

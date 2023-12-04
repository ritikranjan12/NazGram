import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import Queryprovider from './lib/react-query/queryprovider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Queryprovider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Queryprovider>
  </BrowserRouter>
)

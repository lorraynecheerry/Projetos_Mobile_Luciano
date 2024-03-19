import Rotas from './routes'
import AuthProvider from './contexts/Context';

import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div >
      <AuthProvider>
        <Rotas />
        <ToastContainer
          Autoclose={5000} />
      </AuthProvider>
    </div>
  );
}

export default App;

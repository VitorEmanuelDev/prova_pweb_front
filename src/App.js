import { BrowserRouter } from 'react-router-dom'
import MyRoutes from './routes/MyRoutes'
import AuthProvider from './contexts/auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    
    <AuthProvider>
      <ToastContainer autoClose={3000} />
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

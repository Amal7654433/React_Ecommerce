


import AdminRoutes from './routes/adminRoute';
import UserRoutes from './routes/userRoute';
import { ToastContainer } from "react-toastify";
function App() {


  return (
    <>
      <UserRoutes />
      <AdminRoutes/>
      <ToastContainer />
    </>
  )
}

export default App

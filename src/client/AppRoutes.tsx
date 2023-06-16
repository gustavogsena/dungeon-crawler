import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUpRoute from "./routes/SignUpRoute"
import SignInRoute from "./routes/SignInRoute"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignInRoute />} />
        <Route path='/sign-in' element={<SignInRoute />}  />
        <Route path='/sign-up' element={<SignUpRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

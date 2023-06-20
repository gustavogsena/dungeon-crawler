import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import SignUpRoute from "./routes/SignUpRoute"
import SignInRoute from "./routes/SignInRoute"
import LoadAuthUser from "./components/LoadAuthUser"
import { browserHistory } from "./utils/browserHistory"

function AppRoutes() {
  return (
    <HistoryRouter history={browserHistory}>
      <LoadAuthUser />
      <Routes>
        <Route path='/' element={<SignInRoute />} />
        <Route path='/sign-in' element={<SignInRoute />} />
        <Route path='/sign-up' element={<SignUpRoute />} />
      </Routes>
    </HistoryRouter>
  )
}

export default AppRoutes

import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import SignUpRoute from "./routes/SignUpRoute"
import SignInRoute from "./routes/SignInRoute"
import LoadAuthUser from "./components/LoadAuthUser"
import { browserHistory } from "./utils/browserHistory"
import Home from "./routes/Home"
import StandardGameContainer from "./components/StandardGameContainer"
import Header from "./components/Header"
import DungeonMenu from "./routes/DungeonMenu"
import Inventory from "./routes/Inventory"
import CreateHero from "./routes/CreateHero"

function AppRoutes() {
  return (
    <HistoryRouter history={browserHistory}>
      <LoadAuthUser />
      <Routes>
        <Route path='/sign-in' element={<SignInRoute />} />
        <Route path='/sign-up' element={<SignUpRoute />} />
        <Route path="/" element={<StandardGameContainer />}>
          <Route index element={<Home />} />
          <Route path='/create-hero' element={<CreateHero />} />
          <Route path='/dungeon-menu' element={<DungeonMenu />} />
          <Route path='/inventory' element={<Inventory />} />
        </Route>
      </Routes>
    </HistoryRouter>
  )
}

export default AppRoutes

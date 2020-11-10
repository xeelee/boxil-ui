import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom';
import CookieConsent, { OPTIONS } from "react-cookie-consent";
import { Screen } from './components/Screen';
import RomList from './components/RomList';
import Welcome from './components/Welcome';
import CookiePolicy from './components/CookiePolicy';

function App() {
  return (
    <Router>
      <div className="w-full h-full bg-purple-50">
        <div className="flex flex-col items-center">
          <Switch>
            <Route path="/player/:id">
              <div className="overflow-y-auto overflow-x-auto w-full h-screen">
                <Screen />
              </div>
            </Route>
            <Route path="/roms">
              <div className="text-center bg-purple-700 py-8 w-full">
                <span className="text-5xl font-bold text-purple-300" to="/roms">Games</span>
              </div>
              <div className="overflow-y-auto h-screen">
                <RomList />
              </div>
            </Route>
            <Route path="/cookie-policy">
              <CookiePolicy />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
          <CookieConsent
            disableStyles={true}
            location={OPTIONS.BOTTOM}
            buttonClasses="bg-purple-900 py-2 px-4 rounded text-white"
            containerClasses="prose min-w-full sticky absolute bottom-0 w-full bg-yellow-50 flex flex-col shadow p-4 items-center justify-center"
            contentClasses="p-4"
          >
            This website uses cookies to keep user logged in. For further information read the <Link to="/cookie-policy">cookie policy</Link>.
          </CookieConsent>
        </div>
      </div>
    </Router>
  );
}

export default App;

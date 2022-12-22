import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseButton, Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Header } from "./components/header/header";
import { Info } from "./pages/info";
import { Footer } from "./components/footer/footer";
import { Collection } from "./pages/collection";
import { NftDetail } from "./pages/nftdetail";
import { scripts } from "@findonflow/character-client";
import { Script } from "./functions/script";
import { useStateChanged } from "./functions/DisabledState";
import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import ReactGA from "react-ga4";

const enableGoogleAnalytics = () => {
  ReactGA.initialize(process.env.REACT_APP_GAID, {
    gaOptions: {
      app_name: process.env.REACT_APP_APPNAME,
      app_version: "0.1",
    },
  });
  ReactGA.set({ hackathonTeam: process.env.REACT_APP_APPNAME });
  ReactGA.send("pageview");
};

function App() {
  const [user, setUser] = useState({ loggedIn: null });
  const [hasCollection, setHasCollection] = useState(null);
  const [collection, setCollection] = useState(null);
  const disabledState = useStateChanged();

  //Subscribe to the currentUser state in FCL to detect loggedIn status
  useEffect(() => fcl.currentUser().subscribe(setUser), []);

  //enable google analytics on first mount
  useEffect(() => {
    enableGoogleAnalytics();
  }, []);

  //check to see if the currently logged in user has initialised their collection
  useEffect(() => {
    if (user.loggedIn) {
      async function getHasCollection(addr) {
        const getProfile = await Script(scripts.validUser, { target: addr });
        setHasCollection(getProfile);
      }
      try {
        getHasCollection(user.addr);
      } catch (error) {
        console.log(error);
      }
    }
    if (!user.loggedIn) {
      setHasCollection("");
    }
  }, [user, disabledState]);

  // if they do have a collection retrieve all items from their collection,
  useEffect(() => {
    console.log('that ')
    if (hasCollection) {
      console.log('this ')
      async function getCollection(addr) {
        const getCollection = await Script(scripts.viewUser, { address: addr });
        setCollection(getCollection);
      }
      try {
        getCollection(user.addr);
      } catch (error) {
        console.log(error);
      }
    }
  }, [hasCollection, disabledState, user.addr]);

  // console.log(collection)

  return (
    <Container id='main-container'>
      {/* Toaster is an npm module which we use to subscribe to a tx and update status using a toast, this is a non essential component */}
      <div className="toastText">
        <Toaster
          toastOptions={{
            duration: Infinity,
            className: "toastNotification",
          }}
        >
          {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {t.type !== "loading" && (
                    <CloseButton
                      onClick={() => toast.dismiss(t.id)}
                    ></CloseButton>
                  )}
                </>
              )}
            </ToastBar>
          )}
        </Toaster>
      </div>
      <Router>
        <Header user={user} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                hasCollection={hasCollection}
                collection={collection}
              />
            }
          />
          <Route path="/info" element={<Info />} />
          <Route
            path="/collection"
            element={
              <Collection
                hasCollection={hasCollection}
                user={user}
                collection={collection}
              />
            }
          />
          <Route
            path="/collection/:user/:ID"
            element={<NftDetail collection={collection} currentUser={user} />}
          />
        </Routes>
        <Footer />
      </Router>
    </Container>
  );
}

export default App;

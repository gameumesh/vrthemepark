import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import GamesPage from "./pages/GamesPage";
import HeroPages from "./pages/HeroPages";
import WhyChooseUs from "./pages/WhyChooseUs";
import VrThemePark from "./pages/VrThemePark";
import MobileNavbar from "./components/MobileNavbar";
import ClientPage from "./pages/ClientPage";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [headerMounted, setHeaderMounted] = useState(false);
  const [navbarMounted, setNavbarMounted] = useState(false);
  const [HeroMounted, setHeroMounted] = useState(false);
  const [chooseUsMounted, setChooseUsMounted] = useState(false);
  const [gameMounted, setGameMounted] = useState(false);
  const [themeParkMounted, setThemeParkMounted] = useState(false);
  const [clientMounted, setClientMounted] = useState(false);
  const [footerMounted, setFooterMounted] = useState(false);
  const [reviewMounted, setReviewMounted] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        alert(
          "The connection to the server timed out. Reloading the application..."
        );
        window.location.reload();
      }
    }, 15000);

    // If both components have mounted before 15 seconds, clear the timeout
    if (
      headerMounted &&
      footerMounted &&
      navbarMounted &&
      HeroMounted &&
      chooseUsMounted &&
      gameMounted &&
      themeParkMounted &&
      clientMounted &&
      reviewMounted
    ) {
      clearTimeout(timeout);
      setIsLoading(false);
    }

    return () => clearTimeout(timeout);
  }, [
    headerMounted,
    isLoading,
    navbarMounted,
    HeroMounted,
    chooseUsMounted,
    gameMounted,
    themeParkMounted,
    clientMounted,
    footerMounted,
    reviewMounted,
  ]);
  return (
    <>
      <div className={`loader ${!isLoading ? "hidden" : ""}`}>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#ff0091", "#8a22e1", "#761ac2", "#ff0091  ", "#761ac2"]}
        />
      </div>
      <div className="sec1BG">
        <Header onMount={() => setHeaderMounted(true)} />
        <MobileNavbar onMount={() => setNavbarMounted(true)} />
        <HeroPages onMount={() => setHeroMounted(true)} />
        <WhyChooseUs onMount={() => setChooseUsMounted(true)} />
        <GamesPage onMount={() => setGameMounted(true)} />
        <VrThemePark
          onMount={() => setThemeParkMounted(true)}
          onReviewMount={() => setReviewMounted(true)}
        />
        <ClientPage onMount={() => setClientMounted(true)} />
        <Footer onMount={() => setFooterMounted(true)} />
      </div>
    </>
  );
}

export default App;

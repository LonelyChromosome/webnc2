import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsList from "./components/NewsList";

function App() {
  return (
    <>
      <Header />
      <main>
        <NewsList />
      </main>
      <Footer />
    </>
  );
}

export default App;

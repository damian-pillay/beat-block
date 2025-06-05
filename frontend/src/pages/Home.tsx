import Navbar from "../components/Navbar";
import ScreenTexture from "../components/ScreenTexture";
import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <>
      <ScreenTexture />
      <Navbar />
      <div className="relative overflow-hidden">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-extrabold text-white text-center mt-10">
          Good Afternoon, Damian.
        </h1>
        <SearchBar />
      </div>
    </>
  );
}

export default Home;

import Footer from './landingPageComponents/components/Footer';
import Download from './landingPageComponents/components/Download';
import Experience from './landingPageComponents/components/Experience';
import Header from './landingPageComponents/components/Header'
import Hero from './components/Hero'
import Search from './landingPageComponents/components/Search';


function LandingPage() {
  return (
    <div className="App text-white overflow-hidden">
      <Header/>
      <Hero/>
      <Experience/>
      <Search/>
      <Download/>
      <Footer/>
    </div>
  );
}

export default LandingPage;

import { useEffect } from 'react'
import './App.css'
import { fetchData } from './utils/api'
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfig, getGenres } from './store/homeSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Detail from './pages/details/Detail';
import Explore from './pages/explore/Explore';
import SearchResult from './pages/searchResult/SearchResult';
import PageNotFound from './pages/404/PageNotFound';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {

  useEffect(() => {
    fetchApiConfig();
    genresCall();

  }, [])

  const { url } = useSelector(((state) => state.home))

  // console.log(url, 'url');

  const Dispatch = useDispatch()
 
  const fetchApiConfig = () => {  
    fetchData("/configuration").then((res) => {
      // console.log(res,'tests');
      const url = {
        Backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original"
      }

      Dispatch(getApiConfig(url))

    })
  }

  const genresCall = async () => {
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchData(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    

    data.map(({genres}) => {
      return genres.map((ele) => (allGenres[ele.id] = ele))
    });
    // console.log(allGenres);
    Dispatch(getGenres(allGenres));

  };



  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Detail />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App

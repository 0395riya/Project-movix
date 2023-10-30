import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTE2YWNhZDk4MDk4NTVhYWJlM2NlNzhjYjYzNTVhYiIsInN1YiI6IjY0ODJmOTkyYmYzMWYyNTA1NWEwMDdlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6juuWAUq4bf_bnUyHlCqi1L1PuNIW04WhJ48Govtuz4";

const headers = {
    accept: 'application/json',
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchData = async (url, params) => {
try {
const {data} = await axios.get(BASE_URL + url, {headers, params})
// console.log(data, 'testsss');
return data;
} 
catch (err) {
console.log(err);
return err;
}
}
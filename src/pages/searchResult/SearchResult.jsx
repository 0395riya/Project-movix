import React, { useState } from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import { fetchData } from '../../utils/api'
import { useEffect } from 'react'
import Spinner from '../../components/spinner/Spinner'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from '../../components/movieCard/MovieCard'

const SearchResult = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)

  const { query } = useParams()

  useEffect(() => {
    searchData();
    setPageNum(1)
  }, [query])

  const searchData = () => {
    setLoading(true)
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setPageNum((prev) => prev + 1);
      setLoading(false)
    })
  }

  const fetchNextPageData = () => {
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({ ...data, results: [...data?.results, ...res.results] })
      } else {
        setData(res)
      }
      setPageNum((prev) => prev + 1);
    })
  }

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading &&
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className='pageTitle'>
                {`Search ${data?.total_results > 1 ? "results" : "result"} of ${query}`}
              </div>
              <InfiniteScroll className='content'
               dataLength={data?.results?.length || [] }
               next={fetchNextPageData}
               hasMore={pageNum <= data?.total_pages}
               loader={<Spinner/>}
              >
                {data?.results?.map((item, index) => {
                 return(
                   <MovieCard key={index} data={item} fromSearch={true}  />)
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className='resultNotFound'>
              Sorry, Results not found!
            </span>
          )}
        </ContentWrapper>}
    </div>
  )
}

export default SearchResult

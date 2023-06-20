import React, { useRef } from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import posterTemp from '../../assets/no-poster.png'
import Img from '../lazyLoadImage/img';
import dayjs from 'dayjs';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';

const Carousel = ({ data, loading, endPoint, title }) => {

  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home)
  const navigate = useNavigate()

  const Navigation = (dir) => {

const container = carouselContainer.current;
const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) :  container.scrollLeft + (container.offsetWidth + 20);

container.scrollTo({
  left: scrollAmount,
  behaviour: 'smooth',
})
  }

  const skItem = () => {
    return (
      <div className='skeletonItem'>
        <div className='posterBlock skeleton'></div>
        <div className='textBlock'>
          <div className='title skeleton'></div>
          <div className='date skeleton'></div>
        </div>
      </div>
    )
  }


  return (
    <div className='carousel'>
      <ContentWrapper>
      {title && <div className='carouselTitle'>
{title}
      </div>}
        <BsFillArrowLeftCircleFill
          className='carouselLeftNav arrow'
          onClick={() => Navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className='carouselRighttNav arrow'
          onClick={() => Navigation("right")}
        />
        {!loading ?
          (
            <div className='carouselItems' ref={carouselContainer}>
              {data?.map((item) => {
                const posterUrl = item?.poster_path ? url.poster + item?.poster_path : posterTemp
                return (
                  <div key={item.id} className='carouselItem' onClick={() => navigate(`/${item.media_type || endPoint}/${item.id}`)}>
                    <div className='posterBlock'>
                      <Img src={posterUrl} />
                      <CircleRating 
                        rating={item.vote_average.toFixed(1)}
                      />
                      <Genres data={item.genre_ids.slice(0,2)} /> 
                    </div>
                    <div className='textBlock'>
                      <span className='title'>
                        {item.title || item.name}
                      </span>
                      <span className='date'>
                        {dayjs(item.release_date).format("MMM D, YYYY")}
                      </span>
                    </div>

                  </div>

                )
              })}
            </div>
          ) : (
            <div className='loadingSkeleton'>

              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          )}

      </ContentWrapper>

    </div>
  )
}

export default Carousel

import React, {useState} from 'react'
import './style.scss'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import { useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImage/Img'
import posterTemp from '../../../assets/no-poster.png';
import dayjs from 'dayjs'
import Genres from '../../../components/genres/Genres'
import CircleRating from '../../../components/circleRating/CircleRating'
import Playbtn from '../Playbtn'
import VideoPopup from '../../../components/videoPopup/VideoPopup'



const DetailsBanner = ({ video, crew }) => {

    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const _genres = data?.genres.map((ele) => ele.id)
    const { url } = useSelector((state) => state.home)

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const director = crew?.filter((ele) => ele.job === "Director")
    const writer = crew?.filter((item) => item.job === "Screenplay" || item.job === "Story" || item.job === "Writer")

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>

                            <div className='backdrop-img'>
                                <Img src={url.Backdrop + data.backdrop_path} />
                            </div>
                            <div className='opacity-layer'></div>
                            <ContentWrapper>
                                <div className='content'>
                                    <div className='left'>
                                        {data.poster_path ? (
                                            <Img
                                                className="posterImg"
                                                src={url.Backdrop + data.poster_path}
                                            />
                                        ) : (
                                            <Img
                                                className="posterImg"
                                                src={posterTemp}
                                            />)}
                                    </div>
                                    <div className='right'>
                                        <div className='title'>
                                            {`${data.title || data.name}(${dayjs(data?.release_date).format("YYYY")})`}
                                        </div>
                                        <div className='subtitle'>
                                            {data.tagline}
                                        </div>
                                        <Genres data={_genres} />

                                        <div className='row'>
                                            <CircleRating
                                                rating={data.vote_average.toFixed(1)}
                                            />
                                        </div>
                                        <div className='playbtn' onClick={() => {
                                            setShow(true)
                                            setVideoId(video.key)
                                        }}>
                                            <Playbtn />
                                            <span className='text'> Watch Trailer </span>

                                        </div>
                                        <div className='overview'>
                                            <div className='heading'>
                                                Overview
                                            </div>
                                            <div className='description'>
                                                {data?.overview}
                                            </div>
                                        </div>
                                        <div className='info'>
                                            {data.status && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Status: {" "}
                                                    </span>
                                                    <span className='text'>
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Release Date: {" "}
                                                    </span>
                                                    <span className='text'>
                                                        {dayjs(data.release_date).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Runtime: {" "}
                                                    </span>
                                                    <span className='text'>
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {director?.length > 0 && (
                                            <div className='info'>
                                                <span className='text bold'>
                                                    Director:
                                                </span>
                                                <span className='text'>
                                                    {director?.map((item, index) => (
                                                        <span key={index}>
                                                            {item.name}
                                                            {director.length - 1 !== index && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className='info'>
                                                <span className='text bold'>
                                                    Writer:
                                                </span>
                                                <span className='text'>
                                                    {writer?.map((item, index) => (
                                                        <span key={index}>
                                                            {item.name}
                                                            {writer.length - 1 !== index && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {data?.created_by?.length > 0 && (
                                            <div className='info'>
                                                <span className='text bold'>
                                                    Creator:
                                                </span>
                                                <span className='text'>
                                                    {data?.created_by?.map((item, index) => (
                                                        <span key={index}>
                                                            {item.name}
                                                            {data?.created_by.length - 1 !== index && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup 
                                show={show}
                                setShow={setShow}
                                videoId={videoId}
                                setVideoId={setVideoId}
                                 />
                            </ContentWrapper>

                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    )
}

export default DetailsBanner

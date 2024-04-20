import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { API_KEY } from "../../../data";
import { viewCountConverter } from "../../../data";
import { Link } from "react-router-dom";

function Recommended({ categoryId }) {
  const [apiData, setApiData] = useState([]);

  const fetchRelatedData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    let response = await fetch(relatedVideo_url);
    let data = await response.json();
    console.log(data.items);
    setApiData(data.items);
  };
  useEffect(() => {
    fetchRelatedData();
  }, []);

  return (
    <>
      <div className="recommended">
        {apiData.map((item,index) => (
          <Link
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            className="side-video-list"
            key={index}
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{viewCountConverter(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Recommended;

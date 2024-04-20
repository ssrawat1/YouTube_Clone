import React, { useEffect, useState } from "react";
import "./Feed.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { API_KEY, viewCountConverter } from "../../../data";

function Feed({ category }) {
  const [data, setData] = useState([]);
  const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

  const fetchData = async () => {
    const response = await fetch(video_url);
    const data = await response.json();
    console.log(data.items);

    setData(data.items);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <>
      <div className="feed">
        {data.map((item, index) => (
          <Link
            to={`video/${item.snippet.categoryId}/${item.id}`}
            className="card"
            key={item.id}
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {viewCountConverter(item.statistics.viewCount)} Views &bull;{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Feed;

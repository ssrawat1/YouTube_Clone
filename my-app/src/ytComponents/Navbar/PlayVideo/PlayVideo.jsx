import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "../../../assets/like.png";
import dislike from "../../../assets/dislike.png";
import share from "../../../assets/share.png";
import save from "../../../assets/save.png";
import { API_KEY, viewCountConverter } from "../../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

function PlayVideo({}) {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [comment, setComment] = useState([]);

  const fetchVideoData = async () => {
    // Fetching Video aDta Here
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    let response = await fetch(videoDetails_url);
    let data = await response.json();
    console.log(data);
    setApiData(data.items[0]);
  };
  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  const fetchChannelData = async () => {
    // Fetching Channel Data Here
    if (apiData && apiData.snippet) {
      // Check if apiData and apiData.snippet are not null or undefined
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      let response = await fetch(channelData_url);
      let data = await response.json();
      console.log(data);
      setChannelData(data.items[0]);
    }
  };
  const fetchCommnetData = async () => {
    //  Fetching Comment data
    const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    let response = await fetch(commentData_url);
    let data = await response.json();
    console.log(data.items);
    setComment(data.items);
  };
  useEffect(() => {
    if (apiData) {
      fetchChannelData();
      fetchCommnetData();
    }
  }, [apiData]);

  return (
    <>
      <div className="play-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
        <div className="play-video-info">
          <p>
            {apiData ? viewCountConverter(apiData.statistics.viewCount) : "16K"}{" "}
            Views &bull;{" "}
            {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
          </p>
          <div>
            <span>
              {" "}
              <img src={like} alt="" />{" "}
              {apiData ? viewCountConverter(apiData.statistics.likeCount) : ""}{" "}
            </span>
            <span>
              <img src={dislike} alt="" />0
            </span>
            <span>
              {" "}
              <img src={share} alt="" />
              Share
            </span>
            <span>
              <img src={save} alt="" />
              Save
            </span>
          </div>
        </div>
        <hr />
        <div className="publisher">
          <img
            src={channelData ? channelData.snippet.thumbnails.default.url : ""}
            alt=""
          />
          <div>
            <p> {apiData ? apiData.snippet.channelTitle : ""}</p>
            <span>
              {channelData
                ? viewCountConverter(channelData.statistics.subscriberCount)
                : "1M"}
              Subscribers
            </span>
          </div>
          <button>Subscribe</button>
        </div>
        <div className="vid-description">
          <p>
            {apiData
              ? apiData.snippet.description.slice(0, 250) // Here  slice method is used only to make description small
              : "Description Here"}
          </p>

          <hr />

          <h4>
            {apiData ? viewCountConverter(apiData.statistics.commentCount) : ""}{" "}
            Comments
          </h4>
          {comment.map((item) => (
            <div className="comment" key={item.id}>
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}
                  <span>
                    {moment(
                      item.snippet.topLevelComment.snippet.updatedAt
                    ).fromNow()}
                  </span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {viewCountConverter(
                      item.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} alt="" />
                  <span>0</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlayVideo;

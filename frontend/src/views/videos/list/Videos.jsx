import React,{useEffect,useState} from 'react';
import firebase from 'firebase'
import { css } from "@emotion/react";
import Loader from '../../../Components/loader/loader'
import {firebaseInit} from '../../../config/config'
import PuffLoader from "react-spinners/PuffLoader";
import './Videos.css'

const VideosList = () => {

  const [videosLC, setVideosLC] = useState({ videos: [],videosError: '', loading: true });

  useEffect(()=>{
    firebaseInit()
    const videosRef = firebase.database().ref().child('videos')

    videosRef.on('child_added',snap => {
      setVideosLC(prev =>  {
        return {...prev,videos:[...prev.videos, snap.val()],loading:false}
      })
    })

     videosRef.on('child_changed',snap => {
      setVideosLC( prev =>  {
        const updatedList = prev.videos.map(video => {
          return video.transcoding ? snap.val() : video
        })
        return {...prev,videos:[...updatedList], loading:false}
      })
    })

    videosRef.on('child_removed',snap => {
      const newList = videosLC.videos.filter(video => video.key !== snap.val().key)
      setVideosLC({...videosLC, videos:[...newList]});
    })

    return () => videosRef.off();
  },[])

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    color: black;
  `;

  return (
    <div>
      {videosLC.loading ? <Loader loading={videosLC.loading} /> : videosLC.videosError ? <h5>{videosLC.videosError}</h5> : (
        <section>
          <div className="videos-header">
            <i className="fa fa-file-video fa-5x" />
            <p>Videos all day long </p>
          </div>
          <div className="videos-body">
          {videosLC.videos.length > 0 && videosLC.videos.map(video => {
            const {transcoding} = video
            if (transcoding) {
              return (
                <div className="transcoding-video-div" >
                  <video controls >
                      <source type="video/mp4"/>Video tag not supported
                  </video>
                  <p>transcoding in progress...</p>
                  <div className="transcoding-loader">
                  <PuffLoader css={override} color={'black'} loading={transcoding}  size={150} />
                  </div>
                </div>
              )}
              const {bucket,key} = video
            const name = decodeURIComponent(key.split('/')[1].replace(/\+/g, ' '))
            return (
              <div key={key}>
                <video controls >
                  <source type="video/mp4" src={`${bucket}/${key}`}/>
                  <source type="video/webm" src={`${bucket}/${key}`}/>
                  <source type="video/ogg" src={`${bucket}/${key}`}/>
                  Video tag not supported
                </video>
                <p>{name}</p>
              </div>
            )
          })}
          </div>
        </section>
      )}
      {}
    </div>
  );
};

export default VideosList;

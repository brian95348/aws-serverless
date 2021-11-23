import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import {uploadVideo} from '../../../redux/Videos/upload/reducer'
import {fetchPreUploadData} from '../../../redux/Videos/preUpload/reducer'
import Loader from '../../../Components/uploader/uploader'
import './VideoUpload.css'

const VideoUpload = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const {uploading, uploaded, uploadError} = useSelector(state => state.uploadVideo)
  const {data,fetchError,fetched} = useSelector(state => state.preUpload)
  const dispatch = useDispatch();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(()=> {
    if (fetched) {
      const form = new FormData();
      for (let key in data) {
          if (key !== 'upload_url') form.append(key, data[key])
      }
    form.append('Content-Type', selectedVideo.type)
    form.append('file', selectedVideo)
    dispatch(uploadVideo(form,data.upload_url))
    }
  },[fetched])

  const handleChange = (e) => {
    setSelectedVideo(e.target.files[0])
  }

  const handleUpload = async (e) => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE
      })
      dispatch(fetchPreUploadData(accessToken, selectedVideo.name))
    } catch (error) {
      console.log(error);
    }
  }

  const handleCancel = (e) => {
    history.push('/')
  }

  return (
    <>
    { fetchError ? <p>{fetchError}</p> : uploadError ? <p>{uploadError}</p> : (
    <div className="video-upload-container">
      <div className="video-upload-header">
        <i className="fas fa-arrow-up"></i>
        <h1>Upload a video</h1>
      </div>
      <div className="video-upload-item"><p>{selectedVideo && selectedVideo.name}</p></div>
      { selectedVideo &&
        <video  controls  >
                <source type="video/mp4" src={URL.createObjectURL(selectedVideo)}/>
                <source type="video/webm" src={URL.createObjectURL(selectedVideo)}/>
                <source type="video/ogg" src={URL.createObjectURL(selectedVideo)}/>
                Video tag not supported
        </video>
      }
      <div className="video-upload-item">
        <input name="video" type="file" onChange={handleChange} />
        <div className="video-upload-btn">
          {selectedVideo && !(uploading || uploaded) &&
            <div className="btns-div" >
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
            <button onClick={handleUpload} className="upload-btn">Upload</button>
            </div>
          }
        </div>
      </div>
        {uploading && <Loader loading={uploading} />}
        { uploaded && <div style={{textAlign:'center'}}>
            <p>video upload successful! <i className="fa fa-check " ></i></p>
            <div className="btns-div video-upload-btn" >
            <button onClick={handleCancel} className="cancel-btn">Back</button>
            <button onClick={()=> window.location.replace('/videos/upload')} className="upload-btn">Make another upload</button>
            </div>
        </div>}
    </div>
      )
    }
    </>
  )
}

export default VideoUpload

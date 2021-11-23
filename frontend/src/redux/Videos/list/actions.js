export const FETCH_VIDEOS_REQUEST = "FETCH_VIDEOS_REQUEST"
export const FETCH_VIDEOS_SUCCESS = "FETCH_VIDEOS_SUCCESS"
export const FETCH_VIDEOS_FAILURE = "FETCH_VIDEOS_FAILURE"

export const fetchVideosRequest = ()=>{
    return {
        type:FETCH_VIDEOS_REQUEST
    }
}

export const fetchVideosSuccess = (videos)=>{
    return {
        type:FETCH_VIDEOS_SUCCESS,
        payload:videos
    }
}

export const fetchVideosFailure = (err)=>{
    return {
        type:FETCH_VIDEOS_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}

export const UPLOAD_VIDEO_REQUEST = "UPLOAD_VIDEO_REQUEST"
export const UPLOAD_VIDEO_SUCCESS = "UPLOAD_VIDEO_SUCCESS"
export const UPLOAD_VIDEO_FAILURE = "UPLOAD_VIDEO_FAILURE"

export const uploadVideoRequest = ()=>{
    return {
        type:UPLOAD_VIDEO_REQUEST
    }
}

export const uploadVideoSuccess = ()=>{
    return {
        type:UPLOAD_VIDEO_SUCCESS,
    }
}

export const uploadVideoFailure = (err)=>{
    return {
        type:UPLOAD_VIDEO_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}

export const FETCH_PREUPLOAD_DATA_REQUEST = "FETCH_PREUPLOAD_DATA_REQUEST"
export const FETCH_PREUPLOAD_DATA_SUCCESS = "FETCH_PREUPLOAD_DATA_SUCCESS"
export const FETCH_PREUPLOAD_DATA_FAILURE = "FETCH_PREUPLOAD_DATA_FAILURE"

export const fetchPreUploadDataRequest = ()=>{
    return {
        type:FETCH_PREUPLOAD_DATA_REQUEST
    }
}

export const fetchPreUploadDataSuccess = (data)=>{
    return {
        type:FETCH_PREUPLOAD_DATA_SUCCESS,
        payload:data
    }
}

export const fetchPreUploadDataFailure = (err)=>{
    return {
        type:FETCH_PREUPLOAD_DATA_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}

import axios from 'axios'
import * as actionCreators from '../upload/actions'

const initialState = {
    uploading : false,
    uploaded: false,
    uploadError: ''
}

const uploadVideoReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.UPLOAD_VIDEO_REQUEST:
            return {
                ...state,
                uploading:true
            };
        case actionCreators.UPLOAD_VIDEO_SUCCESS:
            return {
                ...state,
                uploading:false,
                uploaded: true,
                uploadError:''
            };
        case actionCreators.UPLOAD_VIDEO_FAILURE:
            return {
                ...state,
                uploading:false,
                uploaded: false,
                uploadError:action.payload,
            };
        default:
            return state;
    }
}

export const uploadVideo = (form,url) => async (dispatch) => {
    try {
        dispatch(actionCreators.uploadVideoRequest())
        await axios.post(url,form,{
                                     headers:{'Content-Type': 'multipart/form-data'}
                                    });
        dispatch(actionCreators.uploadVideoSuccess())
    } catch (error) {
        dispatch(actionCreators.uploadVideoFailure(error))
    }
}

export default uploadVideoReducer

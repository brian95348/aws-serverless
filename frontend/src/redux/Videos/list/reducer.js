import customAxios from '../../axios/axios'
import * as actionCreators from './actions'

const initialState = {
    loading : false,
    videos: [],
    videosError: ''
}

const videosReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.FETCH_VIDEOS_REQUEST:
            return {
                ...state,
                loading:true
            };
        case actionCreators.FETCH_VIDEOS_SUCCESS:
            return {
                ...state,
                loading:false,
                videos:action.payload,
                videosError:''
            };
        case actionCreators.FETCH_VIDEOS_FAILURE:
            return {
                ...state,
                loading:false,
                videosError:action.payload,
                videos:[]
            };
        default:
            return state;
    }
}

export const fetchVideos = () => async (dispatch) => {
    dispatch(actionCreators.fetchVideosRequest())
    try {
        const {data} = await customAxios.get(`/videos/`);
        dispatch(actionCreators.fetchVideosSuccess(data.files))
    } catch (error) {
        dispatch(actionCreators.fetchVideosFailure(error))
    }      
}

export default videosReducer
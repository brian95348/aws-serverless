import customAxios from '../../axios/axios'
import * as actionCreators from '../preUpload/actions'

const initialState = {
    fetching : false,
    data: {},
    fetched: false,
    fetchError: ''
}

const fetchPreUploadDataReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.FETCH_PREUPLOAD_DATA_REQUEST:
            return {
                ...state,
                fetching:true
            };
        case actionCreators.FETCH_PREUPLOAD_DATA_SUCCESS:
            return {
                ...state,
                fetching:false,
                fetched: true,
                data:action.payload,
                fetchError:''
            };
        case actionCreators.FETCH_PREUPLOAD_DATA_FAILURE:
            return {
                ...state,
                fetching:false,
                fetched: false,
                fetchError:action.payload,
                data:{}
            };
        default:
            return state;
    }
}

export const fetchPreUploadData = (token,filename) => async (dispatch) => {
    try {
        dispatch(actionCreators.fetchPreUploadDataRequest())
        const {data} = await customAxios.get(`/s3-policy-document`,{
                                            params: {filename},
                                            headers: {Authorization: `Bearer ${token}`}
                                                                });
        dispatch(actionCreators.fetchPreUploadDataSuccess(data))
    } catch (error) {
        dispatch(actionCreators.fetchPreUploadDataFailure(error))
    }
}

export default fetchPreUploadDataReducer

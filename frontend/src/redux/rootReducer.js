import {combineReducers} from 'redux'
import videosReducer from './Videos/list/reducer'
import videoUploadReducer from './Videos/upload/reducer'
import fetchPreUploadDataReducer from './Videos/preUpload/reducer'

const rootReducer = combineReducers({
    videos: videosReducer,
    uploadVideo: videoUploadReducer,
    preUpload: fetchPreUploadDataReducer
})

export default rootReducer
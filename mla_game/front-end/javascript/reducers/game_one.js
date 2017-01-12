function gameOne(state = {
  loading:true,
  aapb_link:null,
  media_url: null,
  phrases: [],
  metadata:{},
  currentTime:0,
  startTime:0,
  isPlaying:false,
  segment:0,
  wrongPhrases:{}
}, action) {
  switch(action.type){
    case 'GET_GAMEONE':
      return {...state, 
        loading:true
      }
    case 'GET_GAMEONE_SUCCESS':
      return {...state, 
        loading: false,
        aapb_link:action.data.aapb_link,
        media_url:action.data.media_url,
        phrases:action.data.phrases,
        metadata:action.data.metadata,
      }
    case 'SET_PHRASE_LIST':
      return {...state, 
        phrases:action.newPhrases
      }
    case 'SET_CURRENTTIME':
      return {...state, 
        currentTime:action.currentTime
      }
    case 'SET_STARTTIME':
      return {...state, 
        startTime:action.startTime
      }
    case 'SET_ISPLAYING':
      return {...state, 
        isPlaying:action.isPlaying
      }
    case 'ADVANCE_SEGMENT':
      return  {...state, 
        segment:state.segment + action.progress
      }
    case 'GOBACK_ROUND':
      return  {...state, 
        segment:state.segment - action.progress
      }
    case 'MARK_INCORRECT':
      return  {...state.wrongPhrases,
        wrongPhrases:action.phrase
      }
    case 'UNMARK_PHRASE':
      return  {...state, 
        wrongPhrases:action.phrase
      }
    default:
      return state;
  }
}
export default gameOne;
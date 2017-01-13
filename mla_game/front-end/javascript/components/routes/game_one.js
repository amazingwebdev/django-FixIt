import React from 'react'
import LoadingScreen from '../partials/loading_screen'
import GameMeta from '../partials/game_meta'
import Audio from '../partials/audio'
import Phrase from '../partials/phrase'
import Paging from '../partials/paginator'
import { postData } from '../../helpers'
import GameFooter from '../partials/game_footer'

class GameOne extends React.Component{

  constructor(){
    super()
    this.activePhrase = this.activePhrase.bind(this)
    this.playPhrase = this.playPhrase.bind(this)
    this.handleProgress = this.handleProgress.bind(this)
    this.goBack = this.goBack.bind(this)
    this.selectPhrase = this.selectPhrase.bind(this)

    this.state = {
      wrongPhrases:{}
    }  

  }

  selectPhrase(phrase, pk, button){
    // reference state
    const wrongPhrases = {...this.state.wrongPhrases};
    // keys
    let key = `phrase-${pk}`
    let keyExists = key in wrongPhrases;
    wrongPhrases[key] = phrase;
    
    // push object to state only if it already doesn't exist
    // and set the class name accordingly
    if(keyExists){
      // remove item and set state
      delete wrongPhrases[key];
      this.setState({ wrongPhrases });
      // reset button to default state
      button.className = 'text'
    } else {
      this.setState({ wrongPhrases });
      // set button to higlighted state
      button.className = 'text highlighted'
    }
  }

  handleProgress(i) {
    const { gameone, setIsPlaying, setCurrentTime, playPhrase } = this.props

    // copy state
    const wrongPhrases = {...this.state.wrongPhrases};
    
    this.props.wait(3000);

    // update round
    if(gameone.segment <= gameone.phrases.length) {
      this.props.advanceSegment(i)
      this.props.updateScore(10)
    } else {
      return
    }

    // data push for phrases if they exist
    let noPhrases = Object.keys(wrongPhrases).length === 0 && wrongPhrases.constructor === Object
    if(noPhrases) {
      return
    } 
    else {
      for(let key in wrongPhrases){
        // construct object for downvote
        let data = {
          transcript_phrase: wrongPhrases[key].pk
        }
        // helper ajax function to post downvote
        postData('/api/transcriptphrasedownvote/', data);
        this.props.updateScore(1);
      }
      // clean state
      this.setState({
        wrongPhrases:{}
      })
    }

  }

  goBack(i) {
    const { gameone } = this.props
    if(gameone.segment >= 1) {
      this.props.goBackRound(i)
    } else {
      return
    }
  }

  activePhrase(time, start, end){
    const playingPhrase = time <= start || time >= end; 
    if(playingPhrase) {
      return(
        'not-active-phrase'
      )
    } else {
      return(
        'active-phrase'
      )
    }
  }

  playPhrase(callback){
    var media = document.querySelector('.audio-player');
    media.currentTime = callback;
    media.play();
  }
  
  componentWillMount(){
    this.props.fetchGameOne()
  }

  componentWillUnmount(){
    this.props.resetRound(0)
  }
  
  render(){
    const { gameone, setIsPlaying, setCurrentTime, playPhrase, selectPhrase, waitingUpdate, setSegmentEnd } = this.props
    
    if(this.props.gameone.loading) {
      return(
        <LoadingScreen />
      )
    } else {
      return(
        <div>
          <div className="grid">
            <div className='game-meta'>
              <Audio 
                isPlaying={gameone.isPlaying}
                src={gameone.media_url} 
                setCurrentTime={setCurrentTime}
                setIsPlaying={setIsPlaying}
                startTime={gameone.startTime} 
                endSegment={gameone.endSegment}
                time={gameone.currentTime}
              />
              <GameMeta 
                meta={gameone.metadata} 
                aapb_link={gameone.aapb_link} 
              />
            </div>
            <ul className="game-phrase-list">
              {gameone.phrases.map((index, key) => {
                let items = Number(key);
                let currentRound = gameone.segment <= items + 4 && gameone.segment >= items -4;
                let last = gameone.segment == items + 4;

                if(currentRound) {
                return(
                  <li key={key} className={this.activePhrase(gameone.currentTime, index.start_time, index.end_time)}>
                    <Phrase
                       selectPhrase={this.selectPhrase}
                       playPhrase={this.playPhrase}
                       time={gameone.currentTime} 
                       active={gameone.segment}
                       keys={key}
                       details={index}
                       wrongPhrases={gameone.wrongPhrases}
                       setSegmentEnd={setSegmentEnd}
                    />
                  </li>
                 )
                }
               })}
              </ul>
          </div>
  
          <GameFooter
            goBack={this.goBack}
            handleProgress={this.handleProgress}
            max={gameone.phrases.length}
            value={gameone.segment + 3}
            waitingUpdate={this.props.waitingUpdate}
            waiting={this.props.gameone.waiting}
          />
        </div>
      )
    }
  }
}
export default GameOne;
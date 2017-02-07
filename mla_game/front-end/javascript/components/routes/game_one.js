import React from 'react'
import { Link } from 'react-router'
import LoadingScreen from '../partials/loading_screen'
import GameMeta from '../partials/game_meta'
import Audio from '../partials/audio'
import Phrase from '../partials/game_one_phrase'
import Paging from '../partials/paginator'
import { postData } from '../../helpers'
import GameFooter from '../partials/game_footer'
import GameTip from '../partials/game_tip'

class GameOne extends React.Component{

  constructor(){
    super()
    this.activePhrase = this.activePhrase.bind(this)
    this.playPhrase = this.playPhrase.bind(this)
    this.handleProgress = this.handleProgress.bind(this)
    this.goBack = this.goBack.bind(this)
    this.selectPhrase = this.selectPhrase.bind(this)
    this.reload = this.reload.bind(this)

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

  handleProgress() {
    const { gameone, setIsPlaying, setCurrentTime, playPhrase, wait, advanceSegment, updateTotalScore, updateGameScore, endOfRoundOne } = this.props
    // copy state
    const wrongPhrases = {...this.state.wrongPhrases};
    // disable advance round for three seconds when round updates
    // wait(3000);
    
    // check if the round has ended. if so change state. 
    // if not push other things to state like the score and play the media    
    if(gameone.segment <= gameone.phrases.length -2) {
      // update round
      var media = document.querySelector('.audio-player');
      media.currentTime = gameone.startSegment;
      media.play();
      
      advanceSegment(3)
      updateTotalScore(10)
      updateGameScore(10)

      let segmentScore = {
        game:'1',
        score:10
      }
      postData('/api/score/', segmentScore)

    } else {
      endOfRoundOne(true)
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
        this.props.updateTotalScore(1);
        this.props.updateGameScore(1);
        
        let phraseScore = {
          game:'1',
          score:1
        }
        
        postData('/api/score/', phraseScore)
      }
      // clean state
      this.setState({
        wrongPhrases:{}
      })
    }
  }

  reload(){
    this.props.resetSegments(0)
    this.props.resetGameScore(0)
    this.props.endOfRoundOne(false)
    this.props.fetchGameOne()
    this.props.showTipOne(false)
  }

  goBack() {
    const { gameone } = this.props
    if(gameone.segment >= 1) {
      this.props.goBackRound(3)
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
    // update gameone score in state
    this.props.updateGameOneScore(this.props.gameone.gameScore)
    // reset state for game 
    this.props.resetSegments(0)
    this.props.resetGameScore(0);
    this.props.endOfRoundOne(false)
  }

  
  render(){
    const { gameone, setIsPlaying, setCurrentTime, playPhrase, selectPhrase, waitingUpdate, setSegmentEnd, setSegmentStart, advanceSegment } = this.props

    if(this.props.gameone.loading) {
      return(
        <LoadingScreen />
      )
    } else {
      return(
        <div>
          <div className="grid">
            <div className='game-meta'>
              {gameone.endOfRound ? (
                ''
              ) : (
                <div>
                  <Audio 
                    isPlaying={gameone.isPlaying}
                    src={gameone.media_url} 
                    setCurrentTime={setCurrentTime}
                    setIsPlaying={setIsPlaying}
                    startTime={gameone.startTime} 
                    endSegment={gameone.endSegment}
                    startSegment={gameone.startSegment}
                  />
                  <GameMeta 
                    meta={gameone.metadata} 
                    aapb_link={gameone.aapb_link} 
                  />
                </div>
              )}
            </div>
            {gameone.endOfRound ? (
              <div className='roundup'>
                <h1>End Of Round</h1>
                <h2><span className='username'>{this.props.initialData.user[0].username}</span> Just Scored: {gameone.gameScore} Points</h2>
                
                <ul className='game-navigation'>
                  <li><Link onClick={() => this.reload()} to="gameone">Game One</Link></li>
                  <li><Link to="gametwo">Game Two</Link></li>
                  <li><Link to="gamethree">Game Three</Link></li>
                </ul>
              </div>
            ) : (
              <div>
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
                           setSegmentStart={setSegmentStart}
                           setSegmentEnd={setSegmentEnd}
                           advanceSegment={advanceSegment}
                        />
                      </li>
                     )
                    }
                 })}
                </ul>
                {gameone.inGameTip ? (
                  <GameTip dismissTip={this.props.dismissTipOne} />
                  ) : (
                    ''
                )}
              </div>    
            )}
          </div>
          <GameFooter
            gameNumber={gameone.gameNumber}
            gameName={gameone.gameName}
            goBack={this.goBack}
            canGoBack={gameone.canGoBack}
            handleProgress={this.handleProgress}
            max={gameone.phrases.length}
            value={gameone.segment + 3}
            waitingUpdate={this.props.waitingUpdate}
            waiting={this.props.gameone.waiting}
            modalIsOpen={this.props.initialData.modalIsOpen}
            setModal={this.props.setModal}
          />
        </div>
      )
    }
  }
}
export default GameOne;
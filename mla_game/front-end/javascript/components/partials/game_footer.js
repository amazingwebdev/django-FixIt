import React from 'react'
import Paging from './paginator'
import Modal from 'react-modal'


class GameFooter extends React.Component{
  constructor(){
    super()
    this.setModal = this.setModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.setTipsModal = this.setTipsModal.bind(this)
    this.closeTipsModal = this.closeTipsModal.bind(this)
    this.checkCookie = this.checkCookie.bind(this)
    
    this.state = {
      modalOpen:false,
      tipsModal:true
    }
  }

  setModal(){
    let open = this.state.modalOpen
    if(open) {
      this.setState({modalOpen:false})
    } else {
      this.setState({modalOpen:true})
    }
  }

  closeModal(){
    this.setState({modalOpen:false})
  }

  setTipsModal(){
    let open = this.state.tipsModal
    if(open) {
      this.setState({tipsModal:false})
    } else {
      this.setState({tipsModal:true})
    }
  }

  checkCookie(){
    let gameCookieSet = document.cookie.indexOf(this.props.gameCookie) >= 0
    if(gameCookieSet) {
      this.setState({tipsModal:false})
    }
  }

  closeTipsModal(){
    let gameCookieSet = document.cookie.indexOf(this.props.gameCookie) >= 0
    // set cookie if not done alreay on close
    if(!gameCookieSet) {
      let today = new Date(),
          expiry = new Date(today.getTime() + 60 * 24 * 3600 * 1000)
        
        document.cookie=`${this.props.gameCookie}=true;expires=` + expiry.toGMTString()
    }
    
    this.setState({tipsModal:false})
  }

  componentDidMount(){
    this.checkCookie()
  }

  render(){
    return(
      <div className="game-footer">
        <div className="grid">
          <h2 className='title delta'><span>{this.props.gameNumber}</span> {this.props.gameName}</h2>
          <div className="controls">
            <Paging 
              handleProgress={this.props.handleProgress} 
              waitingUpdate={this.props.waitingUpdate}
              waiting={this.props.waiting}
            />                
            <progress className="game-progress" max={this.props.max} value={this.props.value}></progress>
          </div>
          <div className="help">
            <button onClick={() => this.setModal()} className="rules">Rules</button>
            <button onClick={() => this.setTipsModal()} className="tips">Tips</button>              
          </div>
        </div>
        <Modal
          isOpen={this.state.tipsModal}
          onRequestClose={this.closeTipsModal}        
          contentLabel="Game Tips"
          className="modal-content tip-modal"
          overlayClassName="modal-overlay"
        >
          <button className='modal-close' onClick={this.closeTipsModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
              <title>Close Modal</title>
              <path d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zm-12.3 281.9c-74.3 74.3-195.3 74.3-269.6 0-74.3-74.3-74.3-195.3 0-269.6s195.3-74.3 269.6 0c74.4 74.3 74.4 195.3 0 269.6z"/>
              <path d="M340.2 160l-84.4 84.2-84-83.8-11.8 11.8 84 83.8-84 83.8 11.8 11.8 84-83.8 84.4 84.2 11.8-11.8-84.4-84.2 84.4-84.2"/>
            </svg>
          </button>
          <div className={this.props.gameTipsClass}></div>
        </Modal>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}        
          contentLabel="Game Rules"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <h2>Game Rules</h2>
          <button className='modal-close' onClick={this.closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
              <title>Close Modal</title>
              <path d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zm-12.3 281.9c-74.3 74.3-195.3 74.3-269.6 0-74.3-74.3-74.3-195.3 0-269.6s195.3-74.3 269.6 0c74.4 74.3 74.4 195.3 0 269.6z"/>
              <path d="M340.2 160l-84.4 84.2-84-83.8-11.8 11.8 84 83.8-84 83.8 11.8 11.8 84-83.8 84.4 84.2 11.8-11.8-84.4-84.2 84.4-84.2"/>
            </svg>
          </button>
          <p>The recordings that you interact with in FIX IT are historic and sometimes unedited. Sometimes the game will present you with transcripts for produced programs and other times for recordings of raw interviews, field tapes, and even music performances. If you are presented with a transcript segment for the beginning of a recording, you may hear bars and tone before you hear any speech.</p>
          <h2>General Principle</h2>
          <p>When playing FIX IT, the general principle we ask you to consider is whether the transcript or suggested correction is <strong>acceptable or not acceptable.</strong> Ask yourself, "<strong>Is this good enough?</strong>," before making a judgment call. Consider the fact that nearly 70,000 transcripts need to be corrected, and every time a phrase is rejected, the longer it will take and the more human effort it will require to be validated. <strong>We are not looking for perfection!</strong></p>
          <h2>Detailed Guidlines</h2>
          <ul className="list-tips">
            <li>Transcripts should have acceptable punctuation throughout the transcripts. A missing comma is not significant enough to reject a phrase!</li>
            <li>Do your best to minimize the number of misspellings.</li>
            <li>Contractions should be transcribed as the listener hears them, "didn't" or "shoulda."</li>
            <li>Numbers should be transcribed in numerals, "40 years old" or "40th Street."</li>
            <li>Pauses and hesitations (such as "ah" and "um" should be ignored.</li>
            <li>Any significant noise should be transcribed in brackets using descriptive language, "[tone]" or "[dog barks]."</li>
            <li>If a speaker is speaking in a language other than English, it should be transcribed as best as possible in the appropriate language. If you are presented with audio in a language that you do not understand or do not feel comfortable working on, skip the challenge and start the game over.</li>
            <li>For songs, the title of the song should be written in brackets followed by the lyrics verbatim. If you're dealing with an instrumental piece, just the title should be written in brackets. If it's important to convey other information, such as if the piece is being played by a specific orchestra, the correct transcript should provide that info as well e.g., [Schumann's Symphony #3, Leonard Bernstein conducting the New York Philharmonic, 1968]. If you don't know the title of the music, just indicate that music is playing by typing [music] in brackets.</li>
            <li>If you do not know how to spell a word or name and you are playing the Identify Errors game, note that line as having an error. If you are playing the Suggest Fixes game and do not know how to spell the word or name, it should be transcribed as best as possible.</li>
          </ul>
        </Modal>
      </div>
    )
  }
}
export default GameFooter;
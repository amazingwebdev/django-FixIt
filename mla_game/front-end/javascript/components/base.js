import React from 'react'
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { getUserEndpoint } from '../helpers'
import LoadingScreen from './partials/loading_screen'
import { ResponsiveComponent } from 'react-responsive-component'
import Modal from 'react-modal'

class Base extends React.Component {

  constructor(){
    super()
    this.closeModal = this.closeModal.bind(this)
    this.setModal = this.setModal.bind(this)

    this.state = {
      modalOpen:false
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

  componentWillMount(){
    this.props.fetchData()
  }
  
  render() {
    let loading = this.props.initialData.loading;
    if(loading) {
      return(
        <LoadingScreen />
      )
    } else {
      return(
        <div>
          <header className='app-header'>
            <div className="grid">
              <h1 className='game-title'>
                <a className='aapb-link' href="https://ndsr.americanarchive.org/"><span className='aapb-logo'><span className="assistive-text"><abbr title="American Archive of Public Broadcasting">AAPB Logo</abbr></span></span></a>
                <Link to='/' onlyActiveOnIndex>Fix It</Link>
                <button className="info-button" onClick={() => this.setModal()}>
                  <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                    <path fill="#929497" d="M100 199.79c-26.655 0-51.714-10.38-70.562-29.228S.21 126.655.21 100s10.38-51.714 29.228-70.562S73.345.21 100 .21s51.714 10.38 70.563 29.228C189.41 48.286 199.79 73.345 199.79 100s-10.38 51.714-29.228 70.563C151.714 189.41 126.655 199.79 100 199.79zm0-192.587c-24.787 0-48.09 9.652-65.617 27.18C16.856 51.91 7.203 75.213 7.203 100c0 24.787 9.652 48.09 27.18 65.617 17.526 17.528 40.83 27.18 65.617 27.18 24.787 0 48.09-9.652 65.617-27.18 17.528-17.526 27.18-40.83 27.18-65.617 0-24.787-9.652-48.09-27.18-65.617C148.09 16.856 124.787 7.203 100 7.203z"/>
                    <path fill="#929497" d="M90.157 92.51h23.538v64.73H90.157z"/>
                    <ellipse cx="101.926" cy="63.194" fill="#929497" rx="16.049" ry="16.049"/>
                  </svg>
                </button>
              </h1>
              <ReactCSSTransitionGroup 
                component="span"
                className="score delta"
                transitionName="score"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
              >
               <span key={this.props.gameScores.total_score}>{this.props.gameScores.total_score}</span>
              </ReactCSSTransitionGroup>            
              <ul className='app-navigation'>
                <li><Link activeClassName="active" to="leaderboard">
                    <svg className='nav-icon' viewBox="0 0 200 200">
                      <title>Leader Board</title>
                      <rect x="11.4" y="56" width="24" height="144"/>
                      <rect x="113.5" y="40" width="24" height="160"/>
                      <rect x="62.4" y="0" width="24" height="200"/>
                      <rect x="164.6" y="80" width="24" height="120"/>
                    </svg>      
                  </Link>
                </li>
                <li><Link activeClassName="active" to="/" onlyActiveOnIndex>
                    <svg className='nav-icon' viewBox="0 0 200 200">
                      <title>Game Menu</title>
                      <path d="M100.5 60.9c14.4 0 26.1-11.7 26.1-26.1 0-14.4-11.7-26.1-26.1-26.1S74.4 20.4 74.4 34.8c0 14.4 11.7 26.1 26.1 26.1"/>
                      <path d="M100.5 63.6c-15.8 0-28.7-12.9-28.7-28.7 0-15.8 12.9-28.7 28.7-28.7 15.8 0 28.7 12.9 28.7 28.7 0 15.8-12.9 28.7-28.7 28.7zm0-52.2c-12.9 0-23.4 10.5-23.4 23.4 0 12.9 10.5 23.4 23.4 23.4s23.4-10.5 23.4-23.4c0-12.9-10.5-23.4-23.4-23.4zM28.5 190.2c14.4 0 26.1-11.7 26.1-26.1 0-14.4-11.7-26.1-26.1-26.1S2.4 149.7 2.4 164.1c0 14.4 11.7 26.1 26.1 26.1"/>
                      <path d="M28.5 192.8c-15.8 0-28.7-12.9-28.7-28.7s12.9-28.7 28.7-28.7c15.8 0 28.7 12.9 28.7 28.7s-12.9 28.7-28.7 28.7zm0-52.1c-12.9 0-23.4 10.5-23.4 23.4 0 12.9 10.5 23.4 23.4 23.4s23.4-10.5 23.4-23.4c0-12.9-10.5-23.4-23.4-23.4zM171.1 190.2c14.4 0 26.1-11.7 26.1-26.1 0-14.4-11.7-26.1-26.1-26.1-14.4 0-26.1 11.7-26.1 26.1 0 14.4 11.7 26.1 26.1 26.1"/>
                      <path d="M171.1 192.8c-15.8 0-28.7-12.9-28.7-28.7s12.9-28.7 28.7-28.7c15.8 0 28.7 12.9 28.7 28.7s-12.9 28.7-28.7 28.7zm0-52.1c-12.9 0-23.4 10.5-23.4 23.4 0 12.9 10.5 23.4 23.4 23.4s23.4-10.5 23.4-23.4c0-12.9-10.5-23.4-23.4-23.4zM70.3 160.9h59.9v16H70.3zM131.076 68.195l29.95 51.873-13.856 8-29.95-51.873zM73.24 68.215l13.857 8L57.14 128.09l-13.855-8.002z"/>
                    </svg>
                  </Link>
                </li>
                <li><Link activeClassName="active" to="preferences">
                  <svg className="nav-icon" viewBox="0 0 200 200">
                    <title>Preferences</title>
                    <path d="M33.5101291,140.257656 C29.3501697,133.630667 26.164395,126.334398 24.1559243,118.571969 L-7.10542736e-15,117 L-7.10542736e-15,83 L23.754051,81.4541832 C25.6370467,73.4612811 28.7627422,65.9398662 32.9147671,59.1063088 L17,41 L41,17 L59.1063088,32.9147671 C65.0635923,29.2951605 71.5436346,26.4555449 78.4030843,24.5392719 L80,-2.84217094e-14 L114,-2.84217094e-14 L115.524958,23.4335161 C124.428259,25.3534694 132.770146,28.809995 140.257656,33.5101291 L158.7,17.3 L182.7,41.3 L166.117572,60.1659103 C169.93758,66.6841833 172.832747,73.8057299 174.620958,81.3484354 L200,83 L200,117 L174.216592,118.677879 C172.31468,125.985496 169.36906,132.878707 165.549477,139.187766 L182.7,158.7 L158.7,182.7 L139.187766,165.549477 C132.008417,169.895944 124.072642,173.110705 115.630566,174.943632 L114,200 L80,200 L78.2970294,173.831018 C71.8812119,172.02875 65.7983392,169.418435 60.1659103,166.117572 L41.3,182.7 L17.3,158.7 L33.5101291,140.257656 Z M99.2,61.7 C78.5,61.7 61.7,78.5 61.7,99.2 C61.7,119.9 78.5,136.7 99.2,136.7 C119.9,136.7 136.7,119.9 136.7,99.2 C136.7,78.5 119.9,61.7 99.2,61.7 Z"></path>
                  </svg>
                  </Link>
                </li>
                <li>
                  <a href="/logout">Logout</a>
                </li>
              </ul>
            </div>
          </header>
          {React.cloneElement(this.props.children, this.props)}
          <div>
          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}        
            contentLabel="Game Information"
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            <button className='modal-close' onClick={this.closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                <title>Close Modal</title>
                <path d="M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zm-12.3 281.9c-74.3 74.3-195.3 74.3-269.6 0-74.3-74.3-74.3-195.3 0-269.6s195.3-74.3 269.6 0c74.4 74.3 74.4 195.3 0 269.6z"/>
                <path d="M340.2 160l-84.4 84.2-84-83.8-11.8 11.8 84 83.8-84 83.8 11.8 11.8 84-83.8 84.4 84.2 11.8-11.8-84.4-84.2 84.4-84.2"/>
              </svg>
            </button>
            <h1>Game Information</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </Modal>
          </div>
        </div>

      )
    }
  }
}

export default Base;
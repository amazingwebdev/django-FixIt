import React from 'react'
import { patchData } from '../../helpers'
import TopicsInput from './topics_input'
import SourcesInput from './sources_input'

class PreferencesForm extends React.Component {
  constructor(){
    super()
    this.changePreferences = this.changePreferences.bind(this)
    this.selectTopic = this.selectTopic.bind(this)
    this.selectSource = this.selectSource.bind(this)
    this.state = {
      sources:[],
      topics:[]
    }
  }


  selectTopic(pk){
    // reference state
    const topics = [...this.state.topics];
    let topicIsSet = topics.includes(pk)
    
    if(topicIsSet){
      let index = topics.indexOf(pk);
      topics.splice(index, 1);
      this.setState({topics:topics})
    } else {
      topics.push(pk)
      this.setState({topics:topics})
    }
  }

  selectSource(pk){
    // reference state
    const sources = [...this.state.sources];
    let sourceIsSet = sources.includes(pk)
    
    if(sourceIsSet){
      let index = sources.indexOf(pk);
      sources.splice(index, 1);
      this.setState({sources:sources})
    } else {
      sources.push(pk)
      this.setState({sources:sources})
    }
  }

  componentDidMount(){
    this.setState({
      topics:this.props.preferred_topics,
      sources:this.props.preferred_stations
    })
  }
  
  changePreferences(event){
    event.preventDefault();
    // profile to patch to
    let userPk = this.props.user
    let sourcesEmpty = this.state.sources.length === 0
    let topicsEmpty = this.state.topics.length === 0
    
    // objects preferences to patch
    let preferred_topics = {
      "preferred_topics":this.state.topics
    }
    let preferred_stations = {
      "preferred_stations":this.state.sources
    }

    if(topicsEmpty) {
      //do something to object preferred_topics make sure we can patch an empty array
    }
    patchData(`/api/profile/${userPk}/`, preferred_topics)
    
    if(sourcesEmpty) {
      //do something to preferred_stations to make sure we can patch an empty array
    }
    patchData(`/api/profile/${userPk}/`, preferred_stations)
  }


  render(){
    const {source, topics} = this.props

    let topicOptions = topics.map((index, key) => {
      return(
        <TopicsInput 
          selectTopic={this.selectTopic}
          key={key} 
          pk={index.pk}
          topic={index.topic}
          topics={this.props.preferred_topics}
          stateTopics={this.state.topics}
        />
      )
    })

    let sources = source.map((index, key) => {
      return(
        <SourcesInput 
          selectSource={this.selectSource}
          key={key} 
          pk={index.pk}
          state={index.state}
          source={index.source}
          sources={this.props.preferred_stations}
          stateSources={this.state.sources}
        />
      )
    })


    return (
      <div className="preferences-form">
        <form className='grid' ref={(input) => this.preferencesForm = input } onSubmit={(event) => this.changePreferences(event)}>
          <fieldset className='topics-set'>
            <legend>Topic</legend>
            <div>
              {topicOptions}
            </div>
          </fieldset>
          <fieldset className='sources-set'>
            <legend>Organization</legend>
            <div>
              {sources}
            </div>
          </fieldset>
          <button type='submit'>Save</button>
        </form>
      </div>
    )
  }
}

PreferencesForm.proptypes = {
  topics:React.PropTypes.object.isRequired,
  source:React.PropTypes.object.isRequired,
}

export default PreferencesForm;
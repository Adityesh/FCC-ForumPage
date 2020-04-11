import React from 'react';
import Header from './components/Header'
import Topic from './components/Topic'
import moment from 'moment'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    users : [],
    topics : [],
    isFetching : false
  }

  findUser = (id) => {
    return this.state.users.find(user => {
      if(user.id === id) {
        return user.avatar_template
      }
    })
  }
  

  async componentDidMount() {
    const response = await fetch('https://buttercup-island.glitch.me/latest')
    const data = await response.json()
    this.setState({
      topics : data.topic_list.topics,
      users : data.users,
      isFetching : true
    })
  }

  

  render() {
    const {users, topics, isFetching} = this.state
    let userId = Object.values(users)
    
    return (
      <div className="App">
        <h1>FreeCodeCamp Forum Home Page</h1>
        <Header />
        {isFetching ? topics.map((index, key) => {

          let activity = ''
          const createdAt = moment(new Date(),'MM/DD/YYYY')
          const lastUpdated = moment(new Date(index.last_posted_at),'MM/DD/YYYY')
          const minutes = Math.floor(moment.duration(createdAt.diff(lastUpdated)).asMinutes())
          const hours = Math.floor(moment.duration(createdAt.diff(lastUpdated)).asHours())
          const posters = index.posters
          let images = []
          for(let i =0;i<posters.length;i++) {
            images.push(this.findUser(posters[i].user_id))
          }

          

          if(minutes > 59) {
            activity = hours + "h"
          } else {
            activity = minutes + "m"
          }
          return <Topic index = {key+1} topic={index.title} key={key} replies = {index.posts_count} views={index.views} activity={activity} id={index.id} images={images}/>
          
          
          }) : <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
      </div>
    );
  }
  
}

export default App;

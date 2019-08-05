import React, {Fragment} from 'react'
import DeviceStatus from './DeviceStatus'
import CurrentBuild from './CurrentBuild'
import CurrentTest from './CurrentTest'
import TrendHistory from './TrendHistory'
import { Header, Button, Container, Icon } from 'semantic-ui-react'

class Dashboard extends React.Component {
  state= {
    devices: [
      {id: 1, name: 'locks', status: 'online', history: 'today'},
      {id: 2, name: 'cameras', status: 'offline', history: 'now'},
      {id: 3, name: 'garage', status: 'online', history: 'tomorrow'},
    ],
    test_status: true
  }

  componentDidMount(){

  }

  render() {
    return(
      <Fragment>
        <Header color='orange' size='huge' style={{display: 'flex', justifyContent: 'space-around'}}>
          <div >
            <Icon name='home'/>
            Test House
          </div>
          <div >
            Test Status: {this.state.test_status ? 
              <Icon 
                style={{marginLeft: '10px'}} 
                loading name='spinner' 
                color='green'
              /> 
              : 
              <Icon 
                style={{marginLeft: '10px'}} 
                name='close' 
                color='red' 
              /> 
            }
          </div>
        </Header>
        <Container textAlign='center'>
          <Button color='orange' attached='left'>Wallsly</Button>
          <Button attached='right'>SkyControl</Button>
          <Button floated='right' style={{backgroundColor: 'LightSkyBlue', color: 'white'}}>Logs</Button>
        </Container>
        <Container style={{display: 'flex', justifyContent: 'space-around', paddingTop: '50px'}}>
          <DeviceStatus devices={this.state.devices} />
          <div stlye={{display: 'flex', flexDirection: 'column'}}>
            <CurrentBuild />
            <CurrentTest />
          </div>
          <div stlye={{display: 'flex'}}>
            <TrendHistory />
          </div>
        </Container>
      </Fragment>
    )
  }
}

export default Dashboard

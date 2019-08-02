import React, {Fragment} from 'react'
import DeviceStatus from './DeviceStatus'
import CurrentBuild from './CurrentBuild'
import CurrentTest from './CurrentTest'
import TrendHistory from './TrendHistory'
import { Header, Button, Container } from 'semantic-ui-react'

class Dashboard extends React.Component {
  state= {
    devices: [
      {id: 1, name: 'locks', status: 'online'},
      {id: 2, name: 'cameras', status: 'offline'},
      {id: 3, name: 'garage', status: 'online'},
    ]
  }

  render() {
    return(
      <Fragment>
        <Header style={{display: 'flex', justifyContent: 'space-around'}}>
          <div >
            Test House
          </div>
          <div >
            Status:
          </div>
        </Header>
        <Container textAlign='center'>
          <Button color='orange' attached='left'>Wallsly</Button>
          <Button attached='right'>SkyControl</Button>
        </Container>
        <Container style={{display: 'flex', justifyContent: 'space-around'}}>
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

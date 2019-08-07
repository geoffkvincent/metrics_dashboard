import React, {Fragment} from 'react'
import axios from 'axios'
import DeviceStatus from './DeviceStatus'
import CurrentBuild from './CurrentBuild'
import CurrentTest from './CurrentTest'
import TrendHistory from './TrendHistory'
import { Header, Button, Container, Icon } from 'semantic-ui-react'

class Dashboard extends React.Component {
  state= {
    data: [],
    panels: [],
    panel: '',
    current_testcase: {
      name: "WallSly: Toggle cell carrier from AT&T over to Verizon",
      author: "Mark Tyler",
      testcaseId: "5d0a95c0d56ba90141759b14",
      automationKey: "/local-repos/panel/tests/level_2_security.py:PanelSecurityLevelTwo.test_50_carrier_toggle_att_to_verizon",
      automationId: "level_2_security.PanelSecurityLevelTwo.test_50_carrier_toggle_att_to_verizon",
      automationTool: "python-nose"
    },
    activeWallsly: false,
    activeSky: false,
  }

  componentDidMount() {
    axios.get('http://10.1.24.92:9000/testhouse/panels')
      .then( ({data}) => this.setState({data}))
  }

  
  handleClick = (panel_name) => {
    axios.get(`http://10.1.24.92:9000/testhouse/builds?panelName=${panel_name}`)
    .then( ({data}) => this.setState({data}))
  }

  render() {
    const {data} = this.state
    // const data = this.state.bckup_data
    return(
      <Fragment>
        { data.map(data =>
          <div key={data.id}>
            <Header color='orange' size='huge' style={{display: 'flex', justifyContent: 'space-around'}}>
              <div >
                <Icon name='home'/>
                {`Test House
                  `}
              </div>
              <div >
                Test Status: {data.running ? 
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
              <Button 
                active={this.state.active}
                color={this.state.active ? 'orange' : 'blue'} 
                attached='left' 
                onClick={() => {this.handleClick(data.hardware); this.toggleWallslyColor()}}
              >
                Wallsly
              </Button>
              <Button 
                active={this.state.active} 
                color={this.state.active ? 'orange' : 'blue'}
                
                onClick={() => {this.handleClick(data.hardware); this.toggleSkyColor()}}
              >
                SkyControl
              </Button>
              <Button floated='right' style={{backgroundColor: 'LightSkyBlue', color: 'white'}}>Logs</Button>
            </Container>
            <Container style={{display: 'flex', justifyContent: 'space-around', paddingTop: '50px'}}>
              <DeviceStatus devices={data.devices} />
              <div stlye={{display: 'flex', flexDirection: 'column'}}>
                <CurrentBuild data={data}/>
                <CurrentTest current_testcase={{...this.state.current_testcase}} data={{...data}} summary={{...data.test_summary}}/>
              </div>
              <div stlye={{display: 'flex'}}>
                <TrendHistory />
              </div> 
            </Container>
          </div>
        )}
      </Fragment>
    )
  }
}

export default Dashboard

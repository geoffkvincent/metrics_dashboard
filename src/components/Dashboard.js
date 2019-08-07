import React, {Fragment} from 'react'
import axios from 'axios'
import DeviceStatus from './DeviceStatus'
import CurrentBuild from './CurrentBuild'
import CurrentTest from './CurrentTest'
import TrendHistory from './TrendHistory'
import { Header, Button, Container, Icon, Menu } from 'semantic-ui-react'

class Dashboard extends React.Component {
  state= {
    data: [],
    panels: [{"metrics": [], "name": "TH1", "registered": false, "devices": [{"status": "online", "type": "camera", "name": "Ping", "offline_history": [{"event": "online", "dateCreated": 1565131846861}]}, {"status": "online", "type": "camera", "name": "450", "offline_history": [{"event": "online", "dateCreated": 1565131846861}]}, {"status": "online", "type": "camera", "name": "Outside - Doorbell", "offline_history": [{"event": "online", "dateCreated": 1565131846861}]}, {"status": "online", "type": "camera", "name": "Hyrax", "offline_history": [{"event": "online", "dateCreated": 1565131846861}]}, {"status": "online", "type": "camera", "name": "Doorbell", "offline_history": [{"event": "online", "dateCreated": 1565131846861}]}, {"status": "online", "type": "thermostat", "name": "1", "offline_history": [{"event": "online", "dateCreated": 1565131846862}]}, {"status": "offline", "type": "camera", "name": "520", "offline_history": [{"event": "offline", "dateCreated": 1565131846862}]}], "hardware": "wallsly", "running": false, "version": "3.19.1.27869", "id": "5d4a0446d9c147dc60dae5a3"}, {"metrics": [{"measurements": [{"name": "overall", "value": "9.85"}, {"name": "345d", "value": "0.66"}, {"name": "audmgrd", "value": "0.76"}, {"name": "cloudd", "value": "0.24"}, {"name": "dbapd", "value": "0.08"}, {"name": "httpd", "value": "0.96"}, {"name": "iod", "value": "0.38"}, {"name": "listenerd", "value": "0.0"}, {"name": "mmpd", "value": "0.04"}, {"name": "modemd", "value": "3.47"}, {"name": "mosquitto", "value": "0.14"}, {"name": "netd", "value": "0.53"}, {"name": "plugin_server", "value": "1.03"}, {"name": "pulse", "value": "0.06"}, {"name": "pumpernickel", "value": "1.45"}, {"name": "procmand", "value": "0.68"}, {"name": "pyftpd", "value": "0.0"}, {"name": "rf915d", "value": "0.0"}, {"name": "rtspd", "value": "1.63"}, {"name": "schooner", "value": "0.04"}, {"name": "smarthomed", "value": "0.59"}, {"name": "ssdpd", "value": "0.26"}, {"name": "sundance", "value": "4.11"}, {"name": "updated", "value": "0.17"}, {"name": "usage_analytics", "value": "0.0"}, {"name": "videod", "value": "0.0"}, {"name": "webd", "value": "0.75"}, {"name": "zwaved", "value": "0.12"}], "type": "CPU", "name": "Panel CPU Usage", "unit": "%"}, {"measurements": [{"name": "overall", "value": "57.31"}, {"name": "345d", "value": "1.39"}, {"name": "audmgrd", "value": "1.83"}, {"name": "cloudd", "value": "1.98"}, {"name": "dbapd", "value": "1.66"}, {"name": "httpd", "value": "2.07"}, {"name": "iod", "value": "0.18"}, {"name": "listenerd", "value": "1.3"}, {"name": "mmpd", "value": "1.6"}, {"name": "modemd", "value": "1.59"}, {"name": "mosquitto", "value": "0.2"}, {"name": "netd", "value": "1.8"}, {"name": "plugin_server", "value": "0.8"}, {"name": "pulse", "value": "0.39"}, {"name": "pumpernickel", "value": "5.88"}, {"name": "procmand", "value": "1.71"}, {"name": "pyftpd", "value": "1.6"}, {"name": "rf915d", "value": "1.3"}, {"name": "rtspd", "value": "1.78"}, {"name": "schooner", "value": "0.88"}, {"name": "smarthomed", "value": "1.48"}, {"name": "ssdpd", "value": "1.4"}, {"name": "sundance", "value": "5.28"}, {"name": "updated", "value": "1.88"}, {"name": "usage_analytics", "value": "1.45"}, {"name": "videod", "value": "1.31"}, {"name": "webd", "value": "2.22"}, {"name": "zwaved", "value": "2.32"}], "type": "RAM", "name": "Panel RAM Usage", "unit": "%"}], "name": "Wallsly-J1", "registered": true, "devices": [{"status": "online", "type": "thermostat", "name": "therm", "offline_history": [{"event": "online", "dateCreated": 1565131849675}]}, {"status": "online", "type": "camera", "name": "camera dbc twos", "offline_history": [{"event": "online", "dateCreated": 1565131849675}]}], "hardware": "wallsly", "running": false, "version": "3.19.2.28431", "id": "5d4a0449d9c147dc60dae5a5"}],
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
      .then( ({data}) => this.setState({panels: data}))
  }
  
  handlePanelClick = (e, {name}) => {
    this.setState({panel: name})
    axios.get(`http://10.1.24.92:9000/testhouse/builds?panelName=${name}`)
    .then( ({data}) => this.setState({data}))
  }

  render() {
    const {data, panels, panel} = this.state
    // const data = this.state.bckup_data
    return(
      <Fragment>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '40%'}}>
            <Menu size='huge' pointing secondary fluid='false'>
              { panels.map(panel =>
                <div key={panel.id}>
                  <Menu.Item
                    name={panel.name}
                    active={panel === panel.name} 
                    onClick={this.handlePanelClick}
                  />
                </div>
                )
              }
            </Menu>
          </div>
        </div>
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

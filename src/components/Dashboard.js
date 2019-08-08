import React, {Fragment} from 'react'
import axios from 'axios'
import DeviceStatus from './DeviceStatus'
import CurrentTest from './CurrentTest'
import TestSummary from './TestSummary'
import TrendHistory from './TrendHistory'
import { Header, Button, Container, Icon, Menu, Item, Image } from 'semantic-ui-react'

class Dashboard extends React.Component {
  state= {
    build: [],
    panels: [],
    selected_panel: {},
    panel_loaded: false,
    active_panel: '',
    test: false,
  }

  componentDidMount() {
    axios.get('http://10.1.44.2:9000/testhouse/panels')
      .then( ({data}) => this.setState({panels: data}))
    this.timer = setInterval(
        () => this.setState(prevState => ({ selected_panel: prevState.selected_panel })),
        3000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }
  
  handlePanelClick = (selected_panel) => {
    this.setState({selected_panel, panel_loaded: true, active_panel: selected_panel.name})
    axios.get(`http://10.1.44.2:9000/testhouse/builds?panelName=${selected_panel.name}`)
    .then( ({data}) => this.setState({build: data}))
  }

  render() {
    const {panels, selected_panel, panel_loaded} = this.state
    // const data = this.state.bckup_data
    return(
      <Fragment>
        <div>
          <Header color='orange' size='huge' textAlign='center'>
            <div >
              Panels
            </div>
          </Header>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{width: '25%'}}>
              <Menu size='huge' pointing secondary fluid='false'>
                { panels.map(panel =>
                  <div key={panel.id}>
                    <Menu.Item
                      name={panel.name}
                      active={this.state.active_panel === panel.name} 
                      color='orange'
                      onClick={ () => this.handlePanelClick(panel)}
                    />
                  </div>
                  )
                }
              </Menu>
            </div>
          </div>
          { panel_loaded ?
            <div>
              <Container style={{padding: '20px'}}>
                <div stlye={{display: 'flex', justifyContent: 'center', width: '%50'}}>
                  <Item.Group>
                    <Item stlye={{postition: 'relative', marginBottom: '20px'}}>
                      <Item.Image size='medium' src={`data:image/png;base64, ${selected_panel.screenshot}`} style={{position: 'absolute', zIndex: '2', width: "220px", marginLeft: "40px", marginTop: "20px"}}/>
                      <Image size='medium' alt='panel' src={require('../images/wallsly.png')} style={{position: 'relative', zIndex: '1'}}></Image>
                      <Item.Content>
                        <Item.Header as='a'>{selected_panel.name}</Item.Header>
                        <Item.Meta>{selected_panel.hardware}</Item.Meta>
                        <Item.Meta>{selected_panel.version}</Item.Meta>
                        <Item.Description>{`Run Status: ${selected_panel.run_status}`}</Item.Description>
                        <Item.Description>{selected_panel.registered ? 'Registered': 'Not Registered'}</Item.Description>
                        <Item.Extra>
                          <Button size='small' style={{backgroundColor: 'LightSkyBlue', color: 'white'}}>Logs</Button>
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </div>
              </Container>
              {selected_panel.current_test_results ?
                <Container>
                  <Header>Current Test</Header>
                  <CurrentTest current_test={selected_panel.current_test_results} />
                </Container>
                : ''
              }
              <Container style={{display: 'flex', justifyContent: 'space-around', paddingTop: '50px',}}>
                <DeviceStatus devices={selected_panel.devices} />
                <div stlye={{display: 'flex', flexDirection: 'column'}}>
                  {/* <TestSummary /> */}
                </div>
                {/* <div stlye={{display: 'flex'}}>
                  <TrendHistory />
                </div>  */}
              </Container>
            </div>
            : ''
          } 
        </div>
      </Fragment>
    )
  }
}

export default Dashboard

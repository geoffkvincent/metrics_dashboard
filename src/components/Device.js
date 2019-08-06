import React from 'react'
import {Icon, Accordion} from 'semantic-ui-react'
import moment from 'moment'

class Device extends React.Component {
  state = { showDeviceContent: false, activeIndex: 0 }

  toggleDeviceContent = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? +1 : index
    this.setState({ showDeviceContent: !this.state.showDeviceContent, activeIndex: newIndex })
  }

  render(){
    const { device } = this.props
    const { showDeviceContent, activeIndex } = this.state
    return(
      <Accordion fluid styled>
        <Accordion.Title style={{ display: 'flex', justifyContent: 'space-between'}} active={activeIndex === -1} index={-1} onClick={this.toggleDeviceContent}>
          <div>
            <Icon name='dropdown'/>
            {device.name}
          </div>
          <div>
            { device.status === 'online' ? 
              <Icon name='linkify' color='green'/> 
              : 
              <Icon name='unlinkify' color='red' /> 
            }
          </div>
        </Accordion.Title>
        {showDeviceContent ? 
          device.offline_history.map(h =>
            <ul>
              <li>{`${h.event}:   ${moment(h.dateCreated).format("MMM Do YYYY, h:mm:ss a")}`}</li>
            </ul>
          )
          : 
          ''
        }
      </Accordion>
    )
  }
}


export default Device
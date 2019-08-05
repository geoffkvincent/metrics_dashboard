import React from 'react'
import { Card, Accordion, Icon } from 'semantic-ui-react'

class DeviceStatus extends React.Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { devices } = this.props
    return(
      <>
        <Card>
          <Card.Content>
            <Card.Header>Device Status</Card.Header>
            <Card.Content>
              <Card.Description >
                  <Accordion>
                    {devices.map(device =>
                      <Accordion.Title key={device.id} active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
                        <Icon name='dropdown'/>
                        {device.name}
                      </Accordion.Title>
                    )}
                  </Accordion>
              </Card.Description> 
            </Card.Content>
          </Card.Content>
        </Card>
      </>
    )
  }
}

export default DeviceStatus
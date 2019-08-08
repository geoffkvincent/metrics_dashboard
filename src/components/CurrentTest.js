import React from 'react'
import {Step, Icon, Modal, Image, Header} from 'semantic-ui-react'

class CurrentTest extends React.Component {
  state={}

  handleClick = (e, { title }) => this.setState({ active: title })

  render() {
    const {current_test} = this.props
    
    return(
      <Step.Group color='orange'>
        { current_test.map(t =>
          <Step active={this.state.active === t.attributes.icon } onClick={this.handleClick} title={t.attributes.icon}>
            <Step.Content>
              <div>
                {(() => {
                  switch (t.status) {
                    case "PASS": return <Icon name="check circle" color='green'/>;
                    case "PASSED_ON_RETRY": return <Icon name="check circle" color='green'/>;
                    case "FAIL": return <Icon name="check circle" color='red'/>;
                    case "NOT_TESTED": return <Icon name="check circle" color='red'/>;
                    case "NO_RESULT": return <Icon name="check circle" color='red'/>;
                    case "SKIPPED": return <Icon name="check circle" color='red'/>;
                    case "BROKEN_TEST": return <Icon name="check circle" color='red'/>;
                    default:     return "";
                  }
                })()}
              </div>
              <Modal trigger={<Step.Title><Icon name={t.attributes.icon}/></Step.Title>}>
                <Modal.Header>{t.testrun.name}</Modal.Header>
                <Modal.Content image>
                  <Image wrapped size='tiny' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                  <Modal.Description>
                    <Header>{t.status}</Header>
                    <Header>{t.testcase.name}</Header>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Step.Content>
          </Step>
        )}
      </Step.Group>
    )
  }
}


export default CurrentTest

// style={{cursor: 'pointer'}}

//  <Modal trigger={<Button>Show Modal</Button>}>
//     <Modal.Header>Select a Photo</Modal.Header>
//     <Modal.Content image>
//       <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
//       <Modal.Description>
//         <Header>Default Profile Image</Header>
//         <p>We've found the following gravatar image associated with your e-mail address.</p>
//         <p>Is it okay to use this photo?</p>
//       </Modal.Description>
//     </Modal.Content>
//   </Modal> 
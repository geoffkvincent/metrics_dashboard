import React, { createRef } from 'react';
import {Button, Icon, Item, List, Segment, Step} from 'semantic-ui-react'


function underscoresToSpaces(text) {
    return text.replace(/_/g, ' ');
}

function determineStatus(test) {
    if (test.status === 'NO_RESULT' && (test.runstatus === 'RUNNING' || test.runstatus === 'TO_BE_RUN')) {
        return 'RUNNING';
    } else {
        return test.status;
    }
}

class CurrentTest extends React.Component {
    state = {};

    static statusToColor(status) {
        switch (status) {
            case 'PASS':
                return '#00B352';
            case 'PASSED_ON_RETRY':
                return '#247549';
            case 'FAIL':
                return '#f96565';
            case 'BROKEN_TEST':
                return '#ffd377';
            case 'NOT_TESTED':
                return '#6EA9FF';
            case 'SKIPPED':
                return '#A06744';
            case 'NO_RESULT':
                return '#c0c0c0';
            default:
                return 'black'
        }
    }

    static statusToIcon(test) {
        switch (test.status) {
            case 'PASS':
                return 'check circle';
            case 'PASSED_ON_RETRY':
                return 'check circle';
            case 'FAIL':
                return 'close';
            case 'BROKEN_TEST':
                return 'exclamation circle';
            case 'NOT_TESTED':
                return 'question circle';
            case 'SKIPPED':
                return 'redo';
            case 'NO_RESULT':
                return test.attributes.icon ? test.attributes.icon : 'file alternate outline';
            default:
                return ''
        }
    };

    componentWillUpdate(nextProps, nextState) {
        if (nextState.active && nextState.active.clicked) {

        } else {
            nextProps.current_test.results.map((test) => {
                if (test.runstatus === 'RUNNING' || test.runstatus === 'TO_BE_RUN' || (this.state.active && !this.state.active.clicked && this.state.active.id === test.id && test.runstatus === 'FINISHED')) {
                    nextState.active = test;
                    this.refs[test.id].scrollIntoView({inline: 'center', behavior: 'smooth'});
                }
            });
        }
    }

    handleClick = (testcase) => {
        if (this.state.active && this.state.active.id === testcase.id) {
            this.setState({active: undefined})
        } else {
            testcase.clicked = true;
            this.setState({active: testcase});
        }
    };

    render() {
        const {current_test, panel} = this.props;

        return (
            <div>
                <Step.Group widths={current_test.results.length} color='orange' attached='top' style={{overflow: 'auto'}}>
                    {current_test.results.map(t =>
                        <Step key={`${t.testrun.testrunId} - ${t.testcase.automationId}`} active={this.state.active && t.id === this.state.active.id} onClick={() => this.handleClick(t)}>
                            <div ref={t.id} style={{padding: '0'}} />
                            <Icon name={CurrentTest.statusToIcon(t)} style={{color: t.runstatus === 'RUNNING' || t.runstatus === 'TO_BE_RUN' ? 'orange' : CurrentTest.statusToColor(t.status)}}/>
                            <Step.Content>
                                <Step.Title>
                                    {t.testcase.name}
                                </Step.Title>
                            </Step.Content>
                        </Step>
                    )}
                </Step.Group>
                {this.state.active ?
                    <Segment attached style={{background: '#f3f4f5'}}>
                        <Item.Group>
                            <Item>
                                <div style={{display: 'flex', flexDirection: 'column', margin: '15px'}}>
                                    {(() => {
                                        if (this.state.active.attributes.cameraName) {
                                            return panel.devices.map(device =>
                                                device.type === 'camera' && device.name === this.state.active.attributes.cameraName ?
                                                    <Item.Image key={`${device.name}`} style={{maxWidth: '200px'}} size='medium' src={`data:image/png;base64, ${device.screenshot}`}/>
                                                    : ''
                                            )
                                        } else {
                                            return <Icon size='massive' style={{color: CurrentTest.statusToColor(this.state.active.status)}} name={this.state.active.attributes.icon ? this.state.active.attributes.icon : 'file alternate outline'}/>
                                        }

                                    })()}
                                    <div style={{margin: '10px 0', display: 'flex', flexDirection: 'column'}}>
                                        <Button
                                            style={{background: CurrentTest.statusToColor(this.state.active.status), color: 'white', margin: '5px 0'}}
                                            target='_blank' href={`http://slickqa.vivint.com/testruns/${this.state.active.testrun.testrunId}?all=true&result=${this.state.active.id}`}
                                            size='small'
                                        >
                                            {underscoresToSpaces(determineStatus(this.state.active))}
                                        </Button>
                                        <Button
                                            style={{background: 'orange', color: 'white', margin: '5px 0'}}
                                            target='_blank' href='https://jira.vivint.com/secure/CreateIssue.jspa'
                                            size='small'
                                        >
                                            CREATE JIRA
                                        </Button>
                                    </div>
                                </div>
                                <Item.Content>
                                    <Item.Header>{this.state.active.testcase.name}</Item.Header>
                                    <Item.Description>
                                        <Item.Content>
                                            {this.state.active.testcase.steps.map(step =>
                                                <Segment key={step.name}>
                                                    <List>
                                                        <List.Item>Step: {step.name}</List.Item>
                                                        <List.Item>Expected Result: {step.expectedResult ? step.expectedResult : 'none'}</List.Item>
                                                    </List>
                                                </Segment>
                                            )}
                                        </Item.Content>
                                        {this.state.active.reason ?
                                            <Segment style={{backgroundColor: 'dimGrey'}}>
                                                <code style={{color: 'white', whiteSpace: 'pre-wrap'}}>{this.state.active.reason}</code>
                                            </Segment>
                                            : ''}
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                    : '' //<div style={{display: 'flex', flexDirection: 'column'}}>
                    //   {current_test.summary ?
                    //       <TestSummary summary={current_test.summary}/>
                    //       : ''
                    //   }
                    // </div>
                }
            </div>
        )
    }
}


export default CurrentTest

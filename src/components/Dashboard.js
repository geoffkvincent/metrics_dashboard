import React, {Fragment} from 'react'
import axios from 'axios'
import DeviceStatus from './DeviceStatus'
import CurrentTest from './CurrentTest'
import LogForm from './LogForm'
import {Container, Header, Icon, Image, Item, Menu} from 'semantic-ui-react'
import PanelGUI from "./PanelGUI";
import SSH from "./SSH";

class Dashboard extends React.Component {
    state = {
        builds: [],
        panels: [],
        selected_panel: {},
        panel_loaded: false,
        active_panel: '',
        intervals: [],
        loading: true
    };

    getRunStatus(panel) {
        if (panel.run_status === "RUNNING") {
            if (panel.current_test && (panel.current_test.runstatus === "RUNNING" || panel.current_test.runstatus === "TO_BE_RUN")) {
                return "RUNNING";
            } else {
                return "IDLE";
            }
        } else {
            return panel.run_status;
        }
    }

    componentDidMount() {
        axios.get(`api/panels`)
            .then(({data}) => {
                this.setState({panels: data, selected_panel: data[0], loading: false});
                this.loadPanel(data[0], true);
                this.state.intervals.push(...data.map((panel) => {
                    setInterval(async () => {this.loadPanel(panel)}, 3000);
            }));
        });
    }

    componentWillUnmount() {
        this.state.intervals.map((interval) => {
            clearInterval(interval);
        });
    }

    async loadPanel(selected_panel, firstOrClick) {
        if (selected_panel.id === this.state.selected_panel.id) {
            const res1 = await axios.get(`api/panels/${this.state.selected_panel.id}`);
            const res2 = await axios.get(`api/builds?panelName=${selected_panel.name}`);
            const panel = await res1.data;
            const builds = await res2.data;

            this.setState({
                selected_panel: panel,
                builds
            });
        }
        if (firstOrClick) {
            this.setState({selected_panel, panel_loaded: true, active_panel: selected_panel.name});
        }
    }

    render() {
        const {panels, selected_panel, panel_loaded} = this.state;
        // const data = this.state.bckup_data
        return (
            <Fragment>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{width: '25%'}}>
                        <Menu size='huge' pointing secondary fluid>
                            {panels.map(panel =>
                                <div key={panel.id}>
                                    <Menu.Item
                                        name={panel.name}
                                        active={this.state.active_panel === panel.name}
                                        color='orange'
                                        onClick={() => this.loadPanel(panel, true)}
                                    />
                                </div>
                            )
                            }
                        </Menu>
                    </div>
                </div>
                {panel_loaded ?
                    <div>
                        <Container style={{paddingTop: '50px', display: 'flex', justifyContent: 'space-around',}}>
                            <div>
                                <Item.Group>
                                    <Item style={{position: 'relative', marginBottom: '20px'}}>
                                        <PanelGUI panel={selected_panel}/>
                                        <Image size='medium' alt='panel' src={require(`../images/${selected_panel.hardware}.png`)} style={{position: 'relative', zIndex: '1', maxWidth: '300px', maxHeight: '214px'}} onClick={() => <PanelGUI panel={selected_panel}/>}/>
                                        <Item.Content>
                                            <Item.Header as='a'>{selected_panel.name}</Item.Header>
                                            <Item.Meta>{`Hardware: ${selected_panel.hardware.toUpperCase()}`}</Item.Meta>
                                            <Item.Meta>{`Build: ${selected_panel.version}`}</Item.Meta>
                                            {
                                                selected_panel.metrics ?
                                                    selected_panel.metrics.map(metric =>
                                                        metric.measurements.map(measurement =>
                                                            measurement.name === "overall" ?
                                                                <Item.Meta key={`${metric.type}-${measurement.name}`}>{`${metric.type}: ${measurement.value}${metric.unit}`}</Item.Meta>
                                                                : ''
                                                        )
                                                    ) : ''}
                                            <Item.Meta>{`Run Status: ${this.getRunStatus(selected_panel)}`}</Item.Meta>
                                            <Item.Meta>Registered: <Icon name={selected_panel.registered ? "check" : "close"}/></Item.Meta>
                                            <Item.Extra>
                                                <LogForm selected_panel={selected_panel}/>
                                                <SSH panel={selected_panel}/>
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>
                                </Item.Group>
                            </div>
                            <div>
                                <DeviceStatus devices={selected_panel.devices}/>
                            </div>
                        </Container>
                        {selected_panel.current_test_runs ?
                            <Container>
                                {selected_panel.current_test_runs.map(test_run =>
                                    <div key={test_run.id}>
                                        <Header style={{padding: '20px'}}>{test_run.name}</Header>
                                        <CurrentTest current_test={test_run} panel={selected_panel}/>
                                    </div>
                                )
                                }
                            </Container>
                            : ''
                        }
                        {/*<Container style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row', paddingTop: '40px',}}>*/}
                        {/*  {selected_panel.current_test_runs.map(test_run => */}
                        {/*    { if (test_run.state === 'RUNNING') {*/}
                        {/*      return <TestSummary test_run={test_run}/>*/}
                        {/*    } else {*/}
                        {/*      return ''*/}
                        {/*    }*/}
                        {/*    }*/}
                        {/*  )}*/}
                        {/*</Container>*/}
                    </div>
                    : ''
                }
            </Fragment>
        )
    }
}

export default Dashboard

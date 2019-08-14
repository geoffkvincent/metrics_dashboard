import React from 'react'
import {Accordion, Card} from 'semantic-ui-react'

function underscoresToSpaces(text) {
    return text.replace(/_/g, ' ')
}

function statusToColor(status) {
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

const TestSummary = ({test_run}) => (
    <Card color='orange'>
        <Card.Content>
            <Card.Header>{`${test_run.name} test summary`}</Card.Header>
            <Card.Description>
                <Accordion fluid styled>
                    {test_run.summary.statusListOrdered.map(status => <Accordion.Title style={{backgroundColor: statusToColor(status), color: 'white'}}>{`${underscoresToSpaces(status)}: ${test_run.summary.resultsByStatus[status]}`}</Accordion.Title>)}
                </Accordion>
            </Card.Description>
        </Card.Content>
    </Card>
);

export default TestSummary


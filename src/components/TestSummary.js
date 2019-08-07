import React from 'react'
import {Accordion} from 'semantic-ui-react'

const TestSummary = ({summary}) => (
  <Accordion fluid styled>
    <Accordion.Title style={{backgroundColor: '#00B352', color: 'white'}}>{`PASS: ${summary.resultsByStatus.PASS}`}</Accordion.Title>
    <Accordion.Title style={{backgroundColor: '#247549', color: 'white'}}>{`PASSED ON RETRY: ${summary.resultsByStatus.PASSED_ON_RETRY}`}</Accordion.Title>
    <Accordion.Title style={{backgroundColor: '#f96565', color: 'white'}}>{`FAIL: ${summary.resultsByStatus.FAIL}`}</Accordion.Title>
    <Accordion.Title style={{backgroundColor: '#ffd377', color: 'white'}}>{`BROKEN TEST: ${summary.resultsByStatus.BROKEN_TEST}`}</Accordion.Title>
    <Accordion.Title style={{backgroundColor: '#6EA9FF', color: 'white'}}>{`NOT TESTED: ${summary.resultsByStatus.NOT_TESTED}`}</Accordion.Title>
    <Accordion.Title style={{backgroundColor: '#A06744', color: 'white'}}>{`SKIPPED: ${summary.resultsByStatus.SKIPPED}`}</Accordion.Title>
    <Accordion.Title style={{backgroundColor: '#c0c0c0', color: 'white'}}>{`NO RESULT: ${summary.resultsByStatus.NO_RESULT}`}</Accordion.Title>
  </Accordion>
)

export default TestSummary


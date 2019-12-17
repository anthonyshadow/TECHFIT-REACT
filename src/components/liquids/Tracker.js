import React, { Fragment } from 'react';
import { Row } from 'react-bootstrap';
import './Tracker.scss';


export default function Tracker({ waterCounter, coffeeCounter, sodaCounter, otherCounter }) {
  return (
    <Fragment>
      <Row>{waterCounter}</Row>
      <Row>{coffeeCounter}</Row>
      <Row>{sodaCounter}</Row>
      <Row>{otherCounter}</Row>
    </Fragment>
  )
}
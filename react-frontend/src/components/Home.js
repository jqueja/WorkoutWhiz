import React from 'react';
import Card from 'react-bootstrap/Card';
import MyTable from './Table.js'

import Container from '@material-ui/core/Container';

function Home() {
  return (
    <div>
      <Container maxWidth="sm">
      <Card style={{}}>
        <Card.Body>
          <Card.Title>11/1/23 - Wed</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Workout #3</Card.Subtitle>
              <Card.Text>
                <MyTable></MyTable>
                </Card.Text>
              </Card.Body>
          </Card>
    </Container>
    </div>

  )
}


export default Home;
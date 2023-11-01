import React from 'react';
import Card from 'react-bootstrap/Card';
import MyTable from './Table.js'

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function Home() {
  return (
    <div>Home Page
      <Container maxWidth="sm">
      <Typography component="div" style={{ }}>
      <Card style={{}}>
        <Card.Body>
          <Card.Title>11/1/23 - Wed</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Workout #3</Card.Subtitle>
              <Card.Text>
                <MyTable></MyTable>

                </Card.Text>
              </Card.Body>
          </Card>

      </Typography>
    </Container>
    </div>

  )
}


export default Home;
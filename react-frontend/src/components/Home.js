import React from 'react';
import WorkoutCard from './WorkoutCard.js'
import LogWorkout from './LogWorkout.js'

import Container from '@material-ui/core/Container';


function Home() {
  return (
    <div>
      <Container style={{ display:"flex", justifyContent: 'space-between', fontSize: "2rem", marginTop:"2rem", marginBottom:"1.5rem"}}>
          My Workout Log
          <LogWorkout style={{margin:"0"}}></LogWorkout>
      </Container>
        
      <WorkoutCard></WorkoutCard>
      <WorkoutCard></WorkoutCard>
      <WorkoutCard></WorkoutCard>
      <WorkoutCard></WorkoutCard>
      <WorkoutCard></WorkoutCard>
    </div>

  )
}


export default Home;
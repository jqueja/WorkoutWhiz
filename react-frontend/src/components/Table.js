import Table from 'react-bootstrap/Table';

function MyTable() {
    return (
<Table style = {{size:"sm", fontSize:"0.8rem", padding:"0rem"}}>
        <thead>
            <tr>
            <th>Workout</th>
            <th>Weight</th>
            <th>Sets</th>
            <th>Reps</th>
            
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>Glute Bridges</td>
            <td>Weight: 15</td>
            <td>Sets: 3</td>
            <td>Reps: 10</td>
            </tr>
            <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            </tr>
            <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
            </tr>
        </tbody>
        </Table>

    )
}
export default MyTable
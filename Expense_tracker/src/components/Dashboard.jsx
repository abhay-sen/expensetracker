import PlusButton from './PlusButton';

import DataGridDemo from './DataGrid';
import UserName from './UserName';
import NavBar from './NavBar';
import "./../../public/styles/Dashboard.css"

function Dashboard(){
    
    return (
      <div>
        <NavBar />
        <UserName />
        
        <div style={{margin: "0 auto",
  textAlign: "center",justifyContent:"center"}}>
          <DataGridDemo />
        </div>

        <div className="button">
          <form action="/create_expense" method="get" className='plus'>
            <PlusButton type="submit" />
          </form>
        </div>
      </div>
    );
}
export default Dashboard;
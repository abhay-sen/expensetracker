import PlusButton from './PlusButton';
import './../../public/styles/LoggedInpage.css'
import DataGridDemo from './DataGrid';
import UserProfile from './UserProfile';
function Dashboard(){
    
    return (
      <div>
        <UserProfile/>
        <DataGridDemo/>
        <div className="button">
          <form action="/create_expense" method="get">
            <PlusButton type="submit" />
          </form>
        </div>
      </div>
    );
}
export default Dashboard;
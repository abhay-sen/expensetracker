import './../styles/SignInPage.css';

function SignInPage(){
    return <div>
        <div className="block">
            <img src="https://github.com/abhay-sen/expensetracker/blob/main/expense-tracker/src/assets/imgs/Screenshot_2024-03-20_163420-removebg.jpeg?raw=true" alt="logo"/>
            <div className="contents">
                <label htmlFor="username" >Username:</label>
                <input type="text" id='userName' name='userName'placeholder='Enter Username'/>
                <label htmlFor="password">Password:</label>
                <input type="password" id='userName' name='passWord' placeholder='Enter Password'/>
                <button type='submit'>Login</button>
            </div>
            
        </div>
    </div>;
}
export default SignInPage;
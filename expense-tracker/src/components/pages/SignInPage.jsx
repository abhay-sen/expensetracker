import './../styles/SignInPage.css';

function SignInPage(){
    return <div>
        <div className="block">
            <img src="https://drive.google.com/file/d/1oq1GYNdGFDe43eEFIc68KNK5RcFFSoog/view?usp=sharing" alt="logo"/>
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
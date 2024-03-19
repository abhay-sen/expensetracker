import './../styles/SignInPage.css';

function SignInPage(){
    return <div>
        <div className="block">
            <label htmlFor="username" >Username:</label><br />
            <input type="text" id='userName' name='userName'placeholder='Enter Username'/><br />
        </div>
    </div>;
}
export default SignInPage;
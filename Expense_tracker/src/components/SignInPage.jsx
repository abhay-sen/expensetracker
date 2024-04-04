import { Auth } from '@supabase/auth-ui-react'
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'
import supabase from '../config/supabase'
import "./../../public/styles/SignInPage.css"
import { useState, useEffect } from 'react'
import LoggedInpage from './LoggedInpage'
function SignInPage(){
  const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])

    if (!session) {
      return (<div className="auth">
    <img src="/FullLogo.png" alt="logo" />
    <Auth
    supabaseClient={supabase}
    providers={[]}
    appearance={{
      theme: ThemeSupa,
      variables: {
        default: {
          colors: {
              brand: '#00ADB5',
              brandAccent: '#CBF1F5',
              brandButtonText: '#222831',
              defaultButtonBackground: 'white',
              defaultButtonBackgroundHover: '#eaeaea',
              defaultButtonBorder: 'white',
              defaultButtonText: 'gray',
              dividerBackground: '#eaeaea',
              inputBackground: '#71C9CE',
              inputBorder: 'lightgray',
              inputBorderHover: 'gray',
              inputBorderFocus: 'gray',
              inputText: '#222831',
              inputLabelText: '#eeeeee',
              inputPlaceholder: '#eeeeee',
              messageText: 'gray',
              messageTextDanger: 'red',
              anchorTextColor: '#A6E3E9',
              anchorTextHoverColor: '#71C9CE',
          },
        },
      },
      style: {
        button: {
          width: '75%' ,
          marginLeft: '12.5%',


        },
        container:{
          
        },
        input:{
          marginLeft: '7px',
          marginRight: '7px',
          width: '95%'
        },
        label:{
          marginLeft: '7px'
        }
      }
    }}
    
  />
  </div>)
    }
    else {
      
      return (<LoggedInpage/>
        )
    }
  
}
export default SignInPage;
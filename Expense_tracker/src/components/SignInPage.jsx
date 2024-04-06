import { Auth } from '@supabase/auth-ui-react'
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'
import supabase from '../config/supabase'
import "./../../public/styles/SignInPage.css"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignInPage(){
  const navigate = useNavigate();
  const [session, setSession] = useState(null)
  const [uid, setUid] = useState(null); 


    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        if (session) {
          setUid(session.user.id); // Extract UID from session on initial load
        }
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session) {
          setUid(session.user.id); // Update UID on subsequent auth state changes
        } else {
          setUid(null); // Clear UID on logout
        }
      })

      return () => subscription.unsubscribe()
    }, [])
    async function checkUserExists(uid) {
      try {
        const { data, error } = await supabase
          .from("user profiles") // Replace with your actual table name
          .select("id") // Select only the ID column (optional)
          .eq("id", uid) // Filter by the UID
          .single(); // Fetch a single row

        if (error) {
          throw error; // Re-throw the error for handling
        }

        return !!data; // Return true if data exists, false otherwise
      } catch (error) {
        console.error("Error checking user existence:", error);
        return false; // Handle errors gracefully, consider returning null or throwing a specific error
      }
    }
    useEffect(() => {
      if (session) {
        checkUserExists(uid)
          .then((exists) => {
            if (exists) {
              navigate("/dashboard")
            } else {
              navigate("/NameForm")
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
          });
        navigate("/NameForm"); 
        // Change '/dashboard' to your desired route
      }
    }, [session, navigate,uid]); 

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
      
      return null;
    }
  
}

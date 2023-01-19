import React from 'react'
import "./Login.css"
import { Button } from '@material-ui/core'
import {auth,provider} from '../firebase'
import { actionTypes } from './reducer'
import { useStateValue } from './Stateprovider'

const Login = () => {

  const[{},dispatch]=useStateValue()

    const signIn=()=>{
        auth.signInWithPopup(provider)
              .then(result=>{
                dispatch({
                  type:actionTypes.SET_USER,
                  user:result.user
                })
              })
              .catch(error=>alert(error.message))

    }
  return (
    <div className='login'>
        <div className='login_container'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/6/6b/20200905003027%21WhatsApp.svg/119px-WhatsApp.svg.png" alt="whatsapp" />
            <div className='login_text'>
                <h1>Sign in to watsapp</h1>

            </div>
            <Button onClick={signIn} >Sign in with Google</Button>
        </div>
        
    </div>
  )
}

export default Login
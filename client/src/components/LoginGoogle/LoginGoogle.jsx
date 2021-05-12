import React, { useEffect, } from 'react';
import { 
    GoogleLogin, 
} from 'react-google-login';
import { useDispatch, } from "react-redux"

import { SIGN_IN_GOOGLE } from "../../redux/signin/signinActionType"

export default function LoginGoogle () {

    const dispatch = useDispatch();

    const onSuccess = async (response) => {
        console.log(`onSuccess login with Google`);
        const user = response?.profileObj
        
        console.log("login gg", user)
        
        try {
            dispatch({ type: SIGN_IN_GOOGLE, payload: { user }})
        } catch (error) {
            console.log(error)
        }
    }
    
    const onFailure = (response) => {
        console.log(`onFailure login with Google`);
        console.log(response)
    }

    useEffect(() => {
    }, [])

    return (
        <div>
            <GoogleLogin
                clientId="446368611163-5i3vhh6mq7n1li3ep14eegjbk4ngd8q5.apps.googleusercontent.com"
                buttonText="Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                />
        </div>
        
    )
}
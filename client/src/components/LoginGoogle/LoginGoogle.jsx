import React, { useState, useEffect, } from 'react';
import { 
    GoogleLogin, 
} from 'react-google-login';
import { useSelector, useDispatch, } from "react-redux"

import { LOGIN_GOOGLE } from "../../redux/login/loginActionType"

export default function LoginGoogle () {

    const dispatch = useDispatch();

    const onSuccess = async (response) => {
        console.log(`onSuccess login with Google`);
        const user = response?.profileObj
        const token = {
            accessToken: response?.tokenObj.access_token,
        }
        console.log({user, token});
        
        try {
            dispatch({ type: LOGIN_GOOGLE, payload: { user, token }})
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
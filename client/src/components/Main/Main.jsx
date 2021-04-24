import { useMediaQuery } from 'react-responsive'

import NavBar from "../NavBar/NavBar"


export default function Main({ children, isLogin }) {
    
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const isNotMobile = useMediaQuery({ minWidth: 768 })

    const Mobile = ({ children }) => {
        return isMobile ? children : null
    }

    const Default = ({ children }) => {
        return isNotMobile ? children : null
    }

    return ( 
        <>  
            {
                isLogin()? <NavBar deviceType={isMobile}/> : null
            }
             
            <Mobile>
                Mobile
                {children}
            </Mobile>
             
            <Default>
                Not mobile (desktop or laptop or tablet)
                {children}
            </Default>
             
        </>
    )
}
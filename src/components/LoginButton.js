import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    
    return (
        !isAuthenticated && (
            <div>
                <h4 className='moskov-never-sleep'>Please sign in to start quizz</h4>
                <button onClick={() => loginWithRedirect()}>
                    Sign In
                </button>
            </div>
        )
    )
}

export default LoginButton
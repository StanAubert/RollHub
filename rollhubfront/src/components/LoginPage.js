import React from 'react';

const LoginPage = () => {



    return (
        <>
            <h1>RollHub</h1>
            <div>
                <h3>Login</h3>
                <form action="">
                    <input type="email" placeholder={"Email"}/>
                    <input type="password" placeholder={"Mot de passe"}/>
                    <button> Connexion </button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;
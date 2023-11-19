import {Link} from "react-router-dom";

const NotFound = () => {
    return(
        <>
            <h1>Page introuvable</h1>
            <div>
                <p>La page que vous recherchez n'existe pas !</p>
                <Link to={"/home"}> retour au site</Link>
            </div>
        </>
    )
}

export default NotFound
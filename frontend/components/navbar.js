import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import config from '../config/config'
import { useRouter } from 'next/router'



const Navbar = () => {
    const router = useRouter()
    const logout = async () => {
        await axios.get(config.URL + "/api/logout", { withCredentials: true })
        router.push('/')
    }
    return (
        <div>
            {/* <Link href="/"><a> Home </a></Link> |
            <Link href="/register"><a> Register </a></Link>  |
            <Link href="/login"><a> Login </a></Link> |
            <Link href="/logout"><a> Logout </a></Link>  */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                <div className="container-fluid" >
                    <a className="navbar-brand" href="#">Cat Shop</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                            <a className="nav-link" href="/buy">Buy</a>
                            <a className="nav-link" href="/sell">Sell</a>

                        </div>
                    </div>
                    <div className="navbar-nav" >
                        <a className="nav-link " href="/login">Login</a>
                        <a className="nav-link " href="/register">Register</a>
                        <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
                    </div>


                </div>
            </nav>
        </div>
    )
}
export default Navbar
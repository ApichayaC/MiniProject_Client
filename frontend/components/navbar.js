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
            <nav class="navbar navbar-expand-lg navbar-light bg-light" >
                <div class="container-fluid" >
                    <a class="navbar-brand" href="#">Cat Shop</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                            <a class="nav-link" href="/buy">Buy</a>
                            <a class="nav-link" href="/sell">Selling</a>

                        </div>
                    </div>
                    <div class="navbar-nav" >
                        <a class="nav-link " href="/login">Login</a>
                        <a class="nav-link " href="/register">Register</a>
                        <button type="button" class="btn btn-primary" onClick={logout}>Logout</button>
                    </div>


                </div>
            </nav>
        </div>
    )
}
export default Navbar
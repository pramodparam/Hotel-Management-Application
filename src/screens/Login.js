import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    async function Login() {

        const user = { email, password }
        try {
            setLoading(true)
            const res = await axios.post('/api/users/login', user)
            console.log(res.data);
            setLoading(false)
            localStorage.setItem('currentUser', JSON.stringify(res.data))  
            
        window.location.href = '/home'




        } catch (err) {
            console.log(err);
            setLoading(false)
            setError(true)

        }

    }
    return (<>
        <div>
            {loading && (<Loader />)}

            <div class="row justify-content-center mt-5">

                <div class="col-md-5 mt-5" >
                    {error && (<Error message='Invalid Credentials' />)}
                    <div className="bs">
                        <h2>Login</h2>

                        <input type="email" className="form-control m-2" placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" className="form-control m-2" placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />


                        <button className="btn btn-primary m-2 center" onClick={Login}>Login</button>
                    </div>
                </div>
            </div>

        </div>

    </>);
}

export default Login;
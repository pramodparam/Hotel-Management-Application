import axios from "axios";

import { useState } from "react";
import Loader from "../components/Loader";
import Success from "../components/Success";
import Error from "../components/Error";
function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    async function Register() {
        if (name === '' || email === ' ' || password === '' || cpassword === '') {
            alert('Please Enter All Fields')
        } else {
            if (password.length < 6) {
                alert('Password length must be greater than 8')
            }
            else {

                if (password === cpassword) {
                    const user = {
                        name,
                        email,
                        password
                    }

                    try {
                        setLoading(true)
                        const res = await axios.post('https://hotel-management-application.onrender.com/api/users/register', user).data
                        console.log(res)
                        setLoading(false)
                        setSuccess(true)
                        setName('')
                        setEmail('')
                        setPassword('')
                        setCpassword('')

                    } catch (err) {
                        console.log(err)
                        setLoading(false)
                        setError(true)

                    }
                } else {
                    alert('passwords not matched')

                }
            }

        }


    }
    return (<>
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}

            <div class="row justify-content-center mt-5">

                <div class="col-md-5 " >
                    {success && (<Success message='User Registered Successfully' />)}
                    <div className="bs">

                        <h2>Register</h2>
                        <input type="text" className="form-control m-2" placeholder="name" value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <input type="email" className="form-control m-2" placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" className="form-control m-2" placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input type="password" className="form-control m-2" placeholder="confirm password"
                            value={cpassword}
                            onChange={(e) => setCpassword(e.target.value)} />

                        <button class="btn btn-primary m-2 center" onClick={Register}>Register</button>
                    </div>
                </div>
            </div>

        </div>

    </>);
}

export default Register;
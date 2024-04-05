
import { useNavigate} from "react-router-dom"
import { useState } from 'react'
import Logo from '../assets/logo.png'
import axios from 'axios';


export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [Organization, setOrganization] = useState('');

    async function handleSubmit(ev){
        ev.preventDefault();
        const url = 'http://localhost:4000/register';
        console.log(email);
        const {data} = await axios.post(url,{email,password,firstname,lastname,Organization});
        alert("User Created Successfully! Please Login to continue.");
        navigate('/login');
    }


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-15 w-auto cursor-pointer"
            src={Logo}
            alt="Improve"
            onClick={() => navigate('/')}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <label htmlFor="email" className="block text-sm font-medium leading-0 text-gray-900">
                Email address
              </label>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="firstname" className="block text-sm font-medium leading-0 text-gray-900">
                First Name
              </label>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  autoComplete="firstname"
                    value={firstname}
                    onChange={(ev) => setFirstname(ev.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="flex items-center justify-between">
              <label htmlFor="lastname" className="block text-sm font-medium leading-0 text-gray-900">
                Last Name
              </label>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="lastname"
                    value={lastname}
                    onChange={(ev) => setLastname(ev.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="organization" className="block text-sm font-medium leading-0 text-gray-900">
                Organization
              </label>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  autoComplete="organization"
                    value={Organization}
                    onChange={(ev) => setOrganization(ev.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

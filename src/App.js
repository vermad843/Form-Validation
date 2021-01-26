import React,{useState} from 'react';
import './App.css';
import Header from './Header';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = formErrors => {
  let valid = true;
  
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  return valid;
}

function App() {

   const [state, setState] = useState({
      firstName : null,
      lastName : null,
      email : null,
      password : null,
   });

   const [error, setErrors] = useState({
       firstName : '',
       lastName : '',
       email : '',
       password : ''
   })

  const handleSubmit = (e) => {
      e.preventDefault();
      
      if(formValid(error)) {
        console.log(`
          --SUBMITTING--
          FIRST NAME : ${state.firstName}
        `)
      }else {
        console.error("FORM INVALID");
      }
  }

 const handleChange = (e) => {
   e.preventDefault();
   const {name , value} = e.target;
   let formErrors = {...error};

   console.log("Name: ", name);
   console.log("value: ", value);

   switch(name) {
     case 'firstName' : 
       formErrors.firstName = 
          value.length < 3 && value.length > 0 
            ? 'min 3 char required'  
            : '';
          break;
     case 'lastName' : 
       formErrors.lastName = 
          value.length < 3 && value.length > 0 
            ? 'min 3 char required'  
            : '';
          break;
    case 'email' : 
       formErrors.email = 
          emailRegex.test(value) && value.length > 0 
            ? ''  
            : 'invalid email address';
          break;
    case 'password' : 
       formErrors.password = 
          value.length < 3 && value.length > 0 
            ? 'min 3 char required'  
            : '';
          break;
        default:
          break;
   }
  };

  return (
    <>
     <Header/>
    <div className="wrapper">
       <div className = "form-wrapper">
           <h1>Create Account</h1>
           <form onSubmit = {handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className=""
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={handleChange}
              />
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className=""
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={handleChange}
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className = ""
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className = ""
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={handleChange}
              />
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
       </div>
    </div>
    </>
  );
}

export default App;

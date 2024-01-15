import React, {  useRef, useState } from 'react'

export default function FormValidation() {
    console.log("hello")

  const name = useRef()
  const email = useRef()
  const message = useRef()
  const accepteallcondition =  useRef()
  
  const [isFormSent , setIsFormSent ] =useState(false)

  const [errors , setErrors] = useState([])

  const resetForm = () => {
    name.current.value = ""
    email.current.value = ""
    message.current.value = ""
    accepteallcondition.current.checked = false

  }
  const displayErrors = () => {
    
    return errors.map((error , key ) => {
      return <li>   {error.feild} : {error.message}</li>
    })
  }

  const ValidationForm = () => {

    setErrors([])
    const nameValue = name.current.value
    const emailValue = email.current.value
    const messageValue = message.current.value
    const accepteallconditionValue = accepteallcondition.current.checked
    let isFormValid = true 
     if ( nameValue.trim()=== ""){
        setErrors(prevState => [...prevState ,{feild : 'name ' , message :'field required'}])

        isFormValid = false
      }
      if ( emailValue.trim()=== ""){
        setErrors(prevState => [...prevState ,{feild : 'email ' , message :'field required'}])
      }else if (!emailValue.match(/^\S+@\S+\.\S+$/) ){
        setErrors(prevState => [...prevState ,{feild : 'email ' , message :'email invalide'}])
        isFormValid = false
      }
      if ( messageValue.trim()=== ""){
        setErrors(prevState => [...prevState ,{feild : 'message ' , message :'field required'}])
        isFormValid = false
      }
      if ( accepteallconditionValue === (false)){
        setErrors(prevState => [...prevState ,{feild : 'accepteallcondition ' , message :'field required'}])
        isFormValid = false
      }
      return isFormValid
  }
  const submit= (e) => {
    e.preventDefault()

     if (ValidationForm()){
         setIsFormSent(true)
         resetForm() 
        

     }
   
 
   
  
  }
  return (
    
    <div className='container-fluid w-75 mx-auto my-5'>
    
    

    {isFormSent? 
      <div className="alert alert-success" role="alert">
      <strong>success</strong>  Your Form sent succesfuly !!
    </div> 
     : "" 
    }
     <form onSubmit={submit}>
         {errors.length> 0? 
        <div class="alert alert-danger" role="alert">
          <strong>Errors</strong>
          <ul>{displayErrors()}</ul>
        </div> : ""
      }

      
          
         <h1>Contact Form</h1>
         <hr />
        {/*<-- Name input -->*/}
         <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input type="text" id="name" className="form-control" ref={name}/>
                    
          </div>
          {/*<-- Email input -->*/}
          <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email adress</label>
                    <input type="text" id="email" className="form-control" ref={email}/>
                    
          </div>
          {/*<-- Message  input -->*/}
          <div className="form-outline mb-4">
          <label className="form-label" htmlFor="message">Message</label>
          <textarea className="form-control" id="message" rows="4" ref={message} ></textarea>
          
          </div>
          
           {/*<-- Checkbox -->*/}
           <div className="form-check mb-4">
           <div className="d-flex">
               <input className="form-check-input me-2" type="checkbox" id="acceptAllConditions" ref={accepteallcondition}/>
               <label className="form-check-label" htmlFor="acceptAllConditions">
                   Accept all conditions
               </label>
           </div>
           </div>
             {/*<-- Submit  -->*/}
             <button type='submit ' className='btn btn-primary w-100 mr-4'>Submit</button>
             
      </form>

    </div>
  )
}

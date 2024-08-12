import { useState } from 'react'
import axios from 'axios'
import styles from './myStyle.module.css'
function App() {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' })
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState([])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('') // Clear previous messages
    setErrors([])  // Clear previous errors

    try {
      const response = await axios.post('http://localhost:3000/submit_form', formData)
      setMessage(response.data.message)
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors)
      } else {
        setErrors([{ msg: 'Please check your network connection...' }])
      }
    }
  }

  return (
    <>
      <div className={styles.body}>
        <form onSubmit={handleSubmit} className={styles.formBody}>
          <input type="text" name='username' value={formData.username} onChange={handleChange} placeholder=' Username...' /> <br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder=' Email...' /> <br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder=' Password...' /> <br />
          <input type="submit" value='Register' />
          <div className={styles.mssgHandler}>
          {errors.length > 0 ? (
            <ul className={styles.errorList}>
              {errors.map((error, index) => (
                <li key={index}>{error.msg}</li>
              ))}
            </ul>
          ) : (
            message && <b style={{color:'white',backgroundColor:'green',fontSize:'larger', padding:'1pc'}}>{message}</b>
          )}

          </div>

        </form>


      </div>
    </>
  )
}

export default App

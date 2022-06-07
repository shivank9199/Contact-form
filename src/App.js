import './App.css';
import React, {useState} from 'react';

const App = () => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({...userData, [name]: value});
  };

  const submitData = async(event) => {
    event.preventDefault();
    const {name, email, phone, subject, message} = userData;

    if (name && email && phone && subject && message) {
      const res = fetch(
        "https://team-expansion-54ae7-default-rtdb.firebaseio.comuserDataRecords.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            subject,
            message,
          }),
        }
      );

      if (res) {
        setUserData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          address: "",
          message: "",
        });
        alert("Data Stored");
      } else {
        alert("plz fill the data");
      }
    } 
    else {
      alert("plz fill the data");
    }
  };

  return (
    <div className="mainclass">
      <form method="POST" className="formclass">

        <h2>Contact Form</h2>

        <div className="form-control">
          <label className='label'>Full Name</label>
          <input onBlur={handleFocus} focused={focused.toString()} type="text" className="control" placeholder="Your Name" value={userData.name} onChange={postUserData} name="name" id="name" required></input>
          <span>error</span>
        </div>

        <div className="form-control">
          <label className='label'>Email</label>
          <input onBlur={handleFocus} focused={focused.toString()} type="email" className="control" placeholder="Email" value={userData.email} onChange={postUserData} name="email" id="email" required></input>
          <span>error</span>
        </div>

        <div className="form-control">
          <label className='label'>Contact Number</label>
          <input onBlur={handleFocus} focused={focused.toString()} type="text" className="control" placeholder="Contact Number" value={userData.phone} onChange={postUserData} name="phone" id="phone" required></input>
          <span>error</span>
        </div>

        <div className="form-control">
          <label className='label'>Subject</label>
          <input onBlur={handleFocus} focused={focused.toString()} type="text" className="control" placeholder="Subject" value={userData.subject} onChange={postUserData} name="subject" id="subject" required></input>
          <span>error</span>
        </div>

        <div className="form-control">
          <label className='label'>Message</label>
          <input onBlur={handleFocus} focused={focused.toString()} type="text" className="control" placeholder="Enter your message" value={userData.message} onChange={postUserData} name="message" id="message" required></input>
          <span>error</span>
        </div>

        <button type="submit" className="btn" onClick={submitData}>Submit</button>
      </form>
    </div>
  )
}

export default App;
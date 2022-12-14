import './App.css';
import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [selectedOptions, setSelectedOptions] = useState();
  const [error, setError] = useState('');
  // const [userInfo, setUserInfo] = useState();
  const [userData, setUserData] = useState();
  const [terms,setTerms] = useState(false);
  // console.log(userInfo)
  const optionList = [
    { value: "1", label: "Manufacturing", },
    { value: "19", label: "Construction materials" },
    { value: "18", label: "Electronics and Optics" },
    { value: "6", label: "Food and Beverage" },
    { value: "342", label: "Bakery & confectionery products" },
    { value: "43", label: "Beverages" },
    { value: "42", label: "Fish & fish products" },
    { value: "40", label: "Meat & meat products" },
    { value: "39", label: "Milk & dairy products" },
    { value: "437", label: "Other" },
    { value: "378", label: "Sweets & snack food" },
    { value: "13", label: "Furniture" },
    { value: "389", label: "Bathroom/sauna" },
    { value: "385", label: "Bedroom" },
    { value: "390", label: "Children’s room" },
    { value: "98", label: "Kitchen" },
    { value: "101", label: "Living room " },
    { value: "392", label: "Office" },
    { value: "394", label: "Other (Furniture)" },
    { value: "341", label: "Outdoor" },
    { value: "99", label: "Project furniture" },
    { value: "12", label: "Machinery" },
    { value: "94", label: "Machinery components" },
    { value: "91", label: "Machinery equipment/tools" },
    { value: "224", label: "Manufacture of machinery" },
    { value: "97", label: "Maritime" },
    { value: "271", label: "Aluminium and steel workboats" },
    { value: "269", label: "Boat/Yacht building" },
    { value: "230", label: "Ship repair and conversion" },
    { value: "93", label: "Metal structures" },
    { value: "508", label: "Other" },
    { value: "227", label: "Repair and maintenance service" },
    { value: "11", label: "Metalworking" },
    { value: "67", label: "Construction of metal structures" },
    { value: "263", label: "Houses and buildings" },
    { value: "267", label: "Metal products" },
    { value: "542", label: "Metal works" },
    { value: "75", label: "CNC-machining" },
    { value: "62", label: "Forgings, Fasteners " },
    { value: "69", label: "Gas, Plasma, Laser cutting" },
    { value: "66", label: "MIG, TIG, Aluminum welding" },
    { value: "9", label: "Plastic and Rubber" },
    { value: "54", label: "Packaging" },
    { value: "556", label: "Plastic goods" },
    { value: "569", label: "Plastic processing technology" },
    { value: "55", label: "Blowing" },
    { value: "57", label: "Moulding" },
    { value: "53", label: "Plastics welding and processing" },
    { value: "560", label: "Blowing" },
    { value: "5", label: "Moulding" },
    { value: "148", label: "Plastics welding and processing" },
    { value: "150", label: "Plastic profiles" },
    { value: "145", label: "Printing" },
    { value: "7", label: "Advertising" },
    { value: "44", label: "Book/Periodicals printing" },
    { value: "45", label: "Labelling and packaging printing" },
    { value: "8", label: "Textile and Clothing" },
    { value: "337", label: "Clothing" },
    { value: "51", label: "Textile" },
    { value: "47", label: "Wood" },
    { value: "3", label: "Other (Wood)" },
    { value: "37", label: "Wooden building materials" },
    { value: "29", label: "Wooden houses" },
    { value: "33", label: "Other" },
    { value: "2", label: "Creative industries" },
    { value: "25", label: "Energy technology" },
    { value: "35", label: "Environment" },
    { value: "28", label: "Service" },
    { value: "581", label: "Business services" },
    { value: "121", label: "Engineering" },
    { value: "122", label: "Information Technology and Telecommunications" },
    { value: "152", label: "Data processing, Web portals, E-marketing" },
    { value: "125", label: "Programming, Consultancy" },
    { value: "667", label: "Software, Hardware" },
    { value: "122", label: "Telecommunications" },
    { value: "22", label: "Tourism" },
    { value: "141", label: "Translation services" },
    { value: "21", label: "Transport and Logistics" },
    { value: "111", label: "Air" },
    { value: "114", label: "Rail" },
    { value: "112", label: "Road" },
    { value: "113", label: "Water" },
  ];
  //handle userCollection
  function handleSelect(data) {
    setSelectedOptions(data);
    setError('')
    console.log(data)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    const name = e.target.name.value;
    if(selectedOptions === undefined || selectedOptions.length === 0){
      return console.log(setError('Please select any option'))
    }
    const user = {
      id:localStorage.getItem('user'),
      name,
      selectedOptions
    }
    setUserData({user})
    //fetch
    fetch('https://task-server-snowy.vercel.app/user',{
      method:'PUT',
      headers:{
          'Content-Type':'application/json',
      },
      body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data => {
    e.target.reset()
    if(data.acknowledged){
      if(data.upsertedId){
        console.log('id',data.upsertedId)
        console.log(data)
        localStorage.setItem('user', data.upsertedId)
      }
      else{
        console.log('data',data)
      }
    }
      toast.success('successfull')
  })
  }
  console.log()
  //handle user
  useEffect(()=>{
    fetch(`https://task-server-snowy.vercel.app/user/${localStorage.getItem('user')}`)
  .then(res => res.json())
  .then(data => setUserData(data))
  },[])
  console.log(userData)
  return (
    <div className="App">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <div className="container">
        <h2>Please enter your name and pick the Sectors you are currently involved in.</h2>
          <form onSubmit={handleSubmit} className='form-container'>
              <p>Name: </p>
              <input type="text" value={userData?.user?.name} name='name' placeholder='Please Enter Your Name' required/>
              <p>Sectors: </p>
        <Select
          options={optionList}
          placeholder="Select options"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />
        {
          error && 
          <p className='error'>{error}</p>
        }
             
          <div className="form-group">
            <input type="checkbox" onClick={() =>setTerms(!terms)} id="javascript" />
            <label htmlFor="javascript">Agree to terms</label>
          </div>
          
              {
                terms ?
                <>
                {
                  userData ?
                  <input type="submit" value="Update" />
                  :
                  <input type="submit" value="Save" />
                }
                </>
                :
                <>
                {
                  userData ?
                  <input type="submit" value="Update" disabled/>
                  :
                  <input type="submit" value="Save" disabled/>
                }
                </>
              }
          </form>
        </div>
        {
          userData && 
          <>
            <div className='user-container'>
          <h1>User Details</h1>
            <h2>Name: {userData?.user?.name}</h2>
            <div className='user-details'>
            <p>Select item : </p>
         {userData?.user?.selectedOptions.map(user => <p>{user.label},</p>)}
            </div>
        </div>
          </>
          
        }
        {/* {
          if(userData.length > 1){

          }
        } */}
    </div>
  );
}

export default App;

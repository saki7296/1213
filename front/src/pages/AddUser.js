import {useState} from "react";
import {useNavigate} from "react-router-dom";

const AddUser = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        company: "",
        username: "",
        email: "",
        address: "",
        zip: "",
        state: "",
        country: "",
        phone: "",
        image: "",

    });

const handleChange = (name) => (e) => {
    const value = name === "image"?e.target.files[0]:e.target.value;
    setData({...data, [name]: value});
};

const handleSubmit = async () => {
    e.preventDefault();
        const res = await fetch("http://localhost:5000/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
    if (res.ok) {
        setUser({
            name: "",
            company: "",
            username: "",
            email: "",
            address: "",
            zip: "",
            state: "",
            country: "",
            phone: "",
            photo: "",
        });
    try{
        let formData = new FormData();
        formData.append("image", data.image);
        formData.append("name", data.name);
        formData.append("company", data.company);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("address", data.address);
        formData.append("zip", data.zip);
        formData.append("state", data.state);
        formData.append("country", data.country);
        formData.append("phone", data.phone);

        const res = await fetch("http://localhost:3000/user",{method:"POST", body:formData,});
        if(res.ok){
            setData({name: "",
            company: "",
            username: "",
            email: "",
            address: "",
            zip: "",
            state: "",
            country: "",
            phone: "",
            image: "",});
            navigate("/", {replace: true});
        }
    }
    catch (error){
        console.log(error);
    }
};

    return (
        
        <div style={{maxWidth:500, margin:"auto"}}>
            <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" />
            <input type="text" name="company" value={user.company} onChange={handleChange} placeholder="Company" />
            <button type="submit">Add User</button>
            </form>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Your Name" onChange={handleChange("name")} type="text" name="name" value={data.name}/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Company" onChange={handleChange("company")} type="text" name="company" value={data.company}/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Username" onChange={handleChange("username")} type="text" name="username" value={data.username}/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Email" onChange={handleChange("Enter email")} type="email" name="email" value={data.email}/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Address" onChange={handleChange("address")} type="text" name="address" value={data.address}/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Zip Code" onChange={handleChange("zip")} type="text" name="zip" value={data.zip} />
            </div>
            <div className="mb-3">
                <input className="form-control" type="file" onChange={handleChange("image")} name="image" accept="image/*"/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter State" onChange={handleChange("state")} type="text" name="state"  value={data.state} />
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Country" onChange={handleChange("country")} type="text" name="country" value={data.country} />
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Phone Number" onChange={handleChange("phone")} type="text" name="phone" value={data.phone} />
            </div>
            <div className="mb-3">
                <input className="form-control" type="file" onChange={handleChange("image")} name="image" accept="image/*" />
            </div>
            <div className="mb-3">
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};}

export default AddUser; 
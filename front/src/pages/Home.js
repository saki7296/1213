
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";


const Home = () => {
    const [users, setUsers] = useState();

    useEffect(()=>{
        const fetchUsers = async () => {
          const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`);
          const data = await res.json();  
          setUsers(data); 
        };
        fetchUsers();
    },[]);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/${id}`, {
              method: "DELETE",
            });
      
            if (res.ok) {
              setUsers(users.filter((user) => user._id !== id));
            } else {
              console.error("Failed to delete user");
            }
          } catch (error) {
            console.error("Error deleting user:", error);
          }
        };
    

    return (
        <div>
           {users?.map( (user)=> (
              <div>
                <img src={user.avatar} width={"100%"} height={200} />
                <div>
                    <h4>{user.name}</h4>
                    <div>
                        <Link to={`/edit/${user._id}`}>Edit</Link>
                        <button onClick={ ()=> handleDelete(user._id) }>delete</button>
                    </div>
                </div>
              </div>
           ) ) }     
        </div>
        
    );

};


export default Home; 
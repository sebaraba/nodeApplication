import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiConstants.js';


function Admin(props) {
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers().then(res => {
            console.log(res.data)
            setUsers(res.data.data)
        })
        .catch( error => {
            console.log(error)
            setUsers([])
        })
    }, [])
    return(
        <div>
            {users.map(function(d, idx){
                return (<li key={idx}>{d.first_name}, {d.last_name}, {d.email}</li>)
            })}
        </div>
    )
}

function getUsers() {
    const res = axios.get(API_BASE_URL + 'users/search')
    console.log("THIS",res)
    return res
}

export default Admin;
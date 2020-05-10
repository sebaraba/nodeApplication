import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiConstants.js';

function Home(props) {
    const [databaseUp, setDatabaseUp] = useState(true);
    const [serverUp, setServerUp] = useState(true);
    useEffect(() => {
        getHealthCheck().then(res => {
            setServerUp(res.data.server.message === 'UP')
            setServerUp(res.data.database.message === 'UP')
        })
        .catch(error => {
            console.log(error)
            setServerUp(false)
            setDatabaseUp(false)
        })  
    }, [])
    return(
        <div>
           <div> Server : {serverUp? 'UP' : 'DOWN'} </div>
           <div> Database : {databaseUp? 'UP' : 'DOWN'} </div>
        </div>
    )
}

function getHealthCheck() {
    return axios.get(API_BASE_URL + 'health')
}

export default Home;
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { useEffect, useState } from 'react'

export const BaseURL = 'http://172.25.215.74:8080';
const Apis = () => {
    const [Token, setToken] = useState<any>();
    const DependenciasApi = axios.create(); 

    const getToken = async() =>{
        try {
            const resp = await AsyncStorage.getItem('Token')
            setToken(resp)
        } catch (error) {
            setToken('Bearer')
            console.log(Token)
        }
    }

    useEffect(() => {
      getToken();
    }, [])
    
    
    return {
        Token,
        BaseURL,
        DependenciasApi,
        getToken,
        setToken
    }
}

export default Apis
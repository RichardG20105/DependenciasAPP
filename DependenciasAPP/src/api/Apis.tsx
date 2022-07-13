import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { useEffect, useState } from 'react'
import { MapStyleElement } from 'react-native-maps';

export const BaseURL = 'https://dependenciasback.herokuapp.com';
export const MapJSON: MapStyleElement[] = [
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]

const Apis = () => {
    const [Token, setToken] = useState<any>();
    const DependenciasApi = axios.create(); 

    const getToken = async() =>{
        try {
            const resp = await AsyncStorage.getItem('Token')
            setToken(resp)
        } catch (error) {
            setToken('Bearer')
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
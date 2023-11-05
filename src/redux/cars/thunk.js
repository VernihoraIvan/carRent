import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://64aafb9b0c6d844abedf0c7b.mockapi.io';

export const fetchAllCars = createAsyncThunk('cars/fetchAll', async () => {
    const { data } = await axios.get('/carrent');
    return data;
  });

  export const fetchBrands = createAsyncThunk('brands/fetchAll', async() => {
    const {data} = await axios.get('/brands');
    return data;
  })

import dotenv from 'dotenv';
import express from 'express'
dotenv.config();
const url = process.env.MONGO_URI;
console.log('url is ',url);
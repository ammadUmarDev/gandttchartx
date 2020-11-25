import React, {createContext, useEffect, useState} from 'react'
import '../styles/globals.css'
import Head from 'next/head'
import {Provider, useDispatch} from 'react-redux';
import store from '../utils/store';
import {clearFocus} from '../utils/actions';
import firebase from 'firebase'


function MyApp({ Component, pageProps }) {
  if (!firebase.apps.length)
  firebase.initializeApp({
    apiKey: "AIzaSyBBBcCH2zzAJmqz44nYcq4bAjLB-lKzFXk",
    authDomain: "pizza-frankenthal.firebaseapp.com",
    databaseURL: "https://pizza-frankenthal.firebaseio.com",
    projectId: "pizza-frankenthal",
    storageBucket: "pizza-frankenthal.appspot.com",
    messagingSenderId: "370297156233",
    appId: "1:370297156233:web:d551ad7a6cc770d9760c58",
    measurementId: "G-K18JC2ZNJ2"
  });  
  return <>
  <Head>
    <title>GandttchartX</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js" integrity="sha384-LtrjvnR4Twt/qOuYxE721u19sVFLVSA4hf/rRt6PrZTmiPltdZcI7q7PXQBYTKyf" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
      <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  </Head>
  <Provider store={store}><Main Component={Component} pageProps={pageProps}/></Provider></>
}

const Main = ({Component,pageProps}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.onclick = (e) => {
      if(e.path[0].nodeName== "HTML") {
        dispatch(clearFocus())
      }
  }
  }, []);
  return (
    <Component {...pageProps} />
  )
}

export default MyApp

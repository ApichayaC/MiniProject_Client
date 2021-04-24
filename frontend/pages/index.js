import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import CatCard from '../components/catCard'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allActions } from '../store/actions'
import { useEffect } from 'react'

import { Image } from 'antd';


export default function Home({ token }) {
  console.log(token);

  const allaction = bindActionCreators(allActions, useDispatch())
  const cats = useSelector((state) => state.cats)

  const getCats = async () => {
    allaction.getCats()
    console.log(cats);
  }
  useEffect(() => {
    getCats()
  }, [])
  return (

    <Layout >
      <Head>
        <title>Cat Shop</title>
      </Head>
      <div style={{ backgroundColor: "#e8b298",height:"100vh" }}>
        <Navbar />
        <div style={{
          alignItems:"center",
          display:"flex",
          justifyContent :"center",
          margin: "30px"
        }}>
          <Image
            width={500}
            src="https://image.freepik.com/free-vector/draw-banner-cat-dancing-so-funny_45130-579.jpg"
          />
        </div>
        <div style={{
          justifyContent :"center",
          textAlign:"center",
          fontSize: "60px",
          color:"white",
          fontFamily : "'Pacifico', cursive",
          border :"10px #edcc8b solid",
          margin : "20px 20px",
          borderRadius:"50px",
          backgroundColor : "#edcc8b"
        }}>
          <a>WELCOME TO CAT SHOP</a>
        </div>
        <div style={{
          justifyContent :"center",

          color :"#a26360",
          fontSize: "24px",
        }}>
          <a>LIST CATS :</a>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
          }} >
          {
            cats ? cats.map((item, index) => {
              return (
                <div style={{ marginTop: "30px", }}>
                  <CatCard index={false} cat={item} id={index} />
                </div>

              )
            }) : "NO DATA"
          }
        </div>
      </div>
    </Layout >

  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}

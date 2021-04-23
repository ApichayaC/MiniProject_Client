import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import CatCard from '../components/catCard'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allActions } from '../store/actions'
import { useEffect } from 'react'

import { Tabs } from 'antd';

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
      <div style={{ backgroundColor: "#e8b298" }}>
        <Navbar />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around"
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

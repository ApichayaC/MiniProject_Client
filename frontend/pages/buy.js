import { useEffect, useState } from 'react'
import CatCard from '../components/catCard'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allActions } from '../store/actions'
import withAuth from '../components/withAuth'
import Navbar from '../components/navbar'
import css from '../styles/Login.module.css'

function Buy() {

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
        <div style={{backgroundColor :"#e8b298"}}> 
            <Navbar />

            <div style={{
                 display: "flex",
                 flexWrap: "wrap",
                 justifyContent: "space-around"
            }} >
                {
                    cats ? cats.map((item, index) => {
                        return (
                            <div style={{marginTop:"30px", }} key={index}>
                                <CatCard  index={true} sell={false} cat={item} id={index} />
                            </div>
                        )
                    }) : "NO DATA"
                }
            </div>
        </div>
    )
}

export default withAuth(Buy)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}

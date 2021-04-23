import axios from 'axios'
import { useEffect, useState } from 'react'
import CatCard from '../components/catCard'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allActions } from '../store/actions'
import withAuth from '../components/withAuth'
import Navbar from '../components/navbar'
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
        <div>
            <Navbar />
            <div>
                {
                    cats ? cats.map(item => {
                        return (
                          <CatCard index={true} sell={false} cat={item} />
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

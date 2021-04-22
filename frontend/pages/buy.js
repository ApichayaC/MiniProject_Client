import axios from 'axios'
import { useEffect, useState } from 'react'
import CatCard from '../components/catCard'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allActions } from '../store/actions'

export default function Buy() {

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
            <div>
                {
                    cats ? cats.map(item => {
                        return (
                          <CatCard cat={item} />
                        )
                    }) : "NO DATA"
                }
            </div>
        </div>
    )
}
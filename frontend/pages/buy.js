import { useEffect, useState } from 'react'
import CatCard from '../components/catCard'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allActions } from '../store/actions'
import withAuth from '../components/withAuth'
import Navbar from '../components/navbar'
import css from '../styles/Login.module.css'
import { Image } from 'antd';

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
        <div style={{ backgroundColor: "#e8b298", height: "100vh" }}>
            <Navbar />
            <div style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                margin: "30px"
            }}>
                <Image
                    width={800}
                    src="https://image.freepik.com/vector-gratis/dibujar-coleccion-divertido-gato-lindo-estilo-dibujos-animados-doodle_45130-1048.jpg">

                </Image>
            </div>
            <div style={{
                justifyContent: "center",
                textAlign: "center",
                fontSize: "40px",
                color: "white",
                fontFamily: "'Pacifico', cursive",
          
                margin: "20px 20px",
                borderRadius: "50px",
                backgroundColor: "#edcc8b"
            }}>
                <a>You can choose to buy cats.</a>
            </div>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center"
            }} >
                {
                    cats ? cats.map((item, index) => {
                        return (
                            <div style={{ marginTop: "30px", }} key={index}>
                                <CatCard index={true} sell={false} cat={item} id={index} />
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

import React from "react"
import { Button } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"

function MainPage() {
    return(
    <>
    <div 
        style={{
        textAlign:'center',
        border: '1px solid black',
        borderRadius: '15px',
        margin: '10%',
        backgroundColor: '#778899',
        }}
    >
        <h2 style={{marginTop:'3rem', fontSize:'60px'}}>Grade Tracker</h2> 
        <h3 style={{marginBottom: "2rem", fontSize:'40px' }}>for VMS student (62x - 63x)</h3>
        <div
             style={{marginBottom: "3rem"}}
        >
            <Button variant="success" style={{borderRadius:'15px', border:'1px solid black'}} href="/project01/cs">
                Computer Science
            </Button>
            <Button variant="primary" style={{borderRadius:'15px', border:'1px solid black'}} href="/project01/it">
                Information Technology
            </Button>
        </div>
    </div>
    </>
    )
}

export default MainPage
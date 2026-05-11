import {Button, Input, Row, Col} from 'reactstrap';
import banner from '../assets/banner.jpg'
import { useState } from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';

const SharePost=()=>{
    let [postMsg,setMsg]=useState("");
    let [lat,setLat]=useState(23.580319);
    let [lng,setLng]=useState(58.432476);
    const email=useSelector((state)=>state.user.user.email);

    if(navigator.geolocation){
        navigator.geolocation.watchPosition((position)=>{
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
        });
    }

    const sharePost=async()=>{
        if(postMsg=="")
            alert("Please enter your thougts!...")
        else
        {
            try{
                const pdata={email,postMsg,lat:null,lng:null}
                const response=await axios.post("http://localhost:3002/savePost",pdata);
                alert(response.data.message);
            }
            catch(error){
                console.log("Server Error.."+error)
            }
        }
    }
    const shareLoc=async()=>{
            //console.log(lat+","+lng);
            try{
                const pdata={email,postMsg,lat,lng}
                const response=await axios.post("http://localhost:3002/savePost",pdata);
                alert(response.data.message);
            }
            catch(error){
                console.log("Server Error.."+error)
            }
    }
    return(
        <>
            <Row>
                <img src={banner} className='bannerpic'/>
            </Row>
            <Row>
                <Col md='10'>
                    <Input type="textarea"
                           className='form-control'
                           placeholder='Share your thoughts!...'
                           onChange={(e)=>setMsg(e.target.value)}/>
                </Col>
                <Col>
                    <Row>
                        <Button color="danger" className='postbtn' onClick={sharePost}>POST</Button>
                    </Row>
                    <Row>
                        <Button color="success" className='postbtn' onClick={shareLoc}>LOCATION</Button>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
export default SharePost;
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPosts,delPost,updPost } from '../features/PostSlice';
import { Card,CardHeader,CardText,CardFooter,CardBody, Col, Row, Input } from 'reactstrap';
import moment from 'moment';
import { FaRegThumbsDown,FaRegThumbsUp  } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts);
    const email=useSelector((state)=>state.user.user.email);
    const [modal, setModal] = useState(false);
    const [postMsg, setMsg] = useState("");
    const [postid, setPID] = useState("");

    const toggle = (postMsg,postid) => {
        setModal(!modal);
        setMsg(postMsg);
        setPID(postid);
    };

    useEffect(() => {
        dispatch(getPosts());
    }, [posts]);

    const handleDel=(postid)=>{
        if(window.confirm("Are you sure to delete this post !..")==true){
            dispatch(delPost(postid));
            dispatch(getPosts());
        }
    }

    const handleUpdate=()=>{
        const pdata={postMsg,postid};
        dispatch(updPost(pdata));
        dispatch(getPosts());
    }

    return (
        <>
            {
                posts.map((post) => (
                    <Card
                        className="my-3"
                        style={{
                            width: '25rem'
                        }}
                    >
                        <CardHeader>
                            <img src={post.user[0].profilepic} className='cardpic'/>
                            <span style={{fontWeight:'bold'}}>{post.user[0].username}</span>
                            <p>Posted at: {moment(post.createdAt).fromNow()}</p>
                        </CardHeader>
                        <CardBody>
                            <CardText>
                                <p>{post.postMsg}</p>
                                {
                                    post.lat&post.lng?(
                                        <iframe src={`https://maps.google.com/maps?q=${post.lat},${post.lng}&h1=es;&output=embed`} width='auto' height='auto'/>
                                    ):null
                                }
                            </CardText>
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col xs='1'><FaRegThumbsUp  /></Col>
                                <Col><FaRegThumbsDown /></Col>
                                <Col md='2'></Col>
                                {
                                    email==post.email?(
                                        <>
                                            <Col xs='1'> <CiEdit  onClick={()=>toggle(post.postMsg, post._id)}/></Col>
                                            <Col><MdDeleteOutline onClick={()=>handleDel(post._id)}/></Col>
                                        </>
                                    ):null
                                }
                                
                            </Row>
                        </CardFooter>
                    </Card>
                ))
            }
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update Post..</ModalHeader>
                <ModalBody>
                    <Input type="textarea" value={postMsg} onChange={(e)=>setMsg(e.target.value)}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>{
                        toggle();
                        handleUpdate();}
                    }>
                        Update
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default Posts;
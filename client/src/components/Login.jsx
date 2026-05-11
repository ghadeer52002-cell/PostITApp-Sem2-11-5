import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Logo from "../assets/logo-t.png";
import { LoginValidation } from '../validations/LoginValidation';
import {yupResolver} from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../features/UserSlice';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const message=useSelector((state)=>state.user.message);
    const isSuccess=useSelector((state)=>state.user.isSuccess);
    const navigate=useNavigate();

    const {
        register,
        handleSubmit:submitForm,
        formState:{errors}
    }=useForm({resolver:yupResolver(LoginValidation)});

    const handleSubmit=()=>{
       const udata={email,password};
       dispatch(login(udata));
    }
    
    useEffect(()=>{
        if(message=="success" && isSuccess)
            navigate("/home");
    },[message,isSuccess]);

    return (
        <>
            <Container fluid>
                <Row className='login-row'>
                    <Col>
                        <img src="https://png.pngtree.com/png-clipart/20250420/original/pngtree-social-media-concept-with-various-platform-icons-png-image_20741692.png"
                            width="375px" height="450px" />
                    </Col>
                    <Col className='login-col'>
                        <Card>
                            <CardBody>
                                <img src={Logo} width="150px" height="75px"/>
                                <form>
                                    <FormGroup>
                                        <h5 style={{color:'red'}}>{message}</h5>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <input 
                                            type='email' 
                                            placeholder='Enter Email Address' 
                                            className='form-control'
                                            {...register("email",{
                                                onChange:(e)=>setEmail(e.target.value)
                                            })}/>
                                            <p style={{color:'red'}}>{errors.email?.message}</p>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <input 
                                            type='password' 
                                            placeholder='Enter Password' 
                                            className='form-control' 
                                            {...register("password",{
                                                onChange:(e)=>setPassword(e.target.value)
                                            })}/>
                                            <p style={{color:'red'}}>{errors.password?.message}</p>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type='checkbox'></Input>
                                        <Label>Remember me</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <a href="#">Forgot Password</a>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color='primary' onClick={submitForm(handleSubmit)}>SIGN IN</Button>
                                    </FormGroup>
                                    <FormGroup>
                                        No Account?
                                        <Link to="/register">Sign Up</Link>
                                        Now
                                    </FormGroup>
                                </form>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Login;
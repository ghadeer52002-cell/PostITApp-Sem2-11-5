import { Button, Card, CardBody, Col, Container, FormGroup, Label, Row } from 'reactstrap';
import Logo from '../assets/logo-t.png';
import { RegisterValidation } from '../validations/RegisterValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {useDispatch,useSelector} from 'react-redux';
import { addUser } from '../features/UserSlice';
import { useState } from 'react';

const Register = () => {
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [username,setUName]=useState("");
    let [profilepic,setPP]=useState("");
    const dispatch=useDispatch();
    const message=useSelector((state)=>state.user.message);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({resolver: yupResolver(RegisterValidation)});

    const onSubmit = (data) => {
        const udata={email,username,password,profilepic};
        dispatch(addUser(udata));
    };
    return (
        <Container fluid>
            <Row className='login-row'>
                <Col className='login-col'>
                    <Card>
                        <CardBody>
                            <img src={Logo} width='150px' height='75px' alt="logo" />
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <FormGroup>
                                    <Label>Full Name</Label>
                                    <input
                                        type='text'
                                        placeholder='Enter Full Name'
                                        className='form-control'
                                        {...register('name',{
                                            onChange:(e)=>setUName(e.target.value)
                                        })}
                                    />
                                    <p style={{ color: 'red' }}>{errors.name?.message}</p>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Email</Label>
                                    <input
                                        type='email'
                                        placeholder='Enter Email'
                                        className='form-control'
                                        {...register('email',{
                                            onChange:(e)=>setEmail(e.target.value)
                                        })}
                                    />
                                    <p style={{ color: 'red' }}>{errors.email?.message}</p>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Password</Label>
                                    <input
                                        type='password'
                                        placeholder='Enter Password'
                                        className='form-control'
                                        {...register('password',{
                                            onChange:(e)=>setPassword(e.target.value)
                                        })}
                                    />
                                    <p style={{ color: 'red' }}>{errors.password?.message}</p>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Confirm Password</Label>
                                    <input
                                        type='password'
                                        placeholder='Confirm Password'
                                        className='form-control'
                                        {...register('confirmPassword')}
                                    />
                                    <p style={{ color: 'red' }}>{errors.confirmPassword?.message}</p>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Profile Picture URL</Label>
                                    <input
                                        type='text'
                                        placeholder='Profile Pic URL'
                                        className='form-control'
                                        onChange={(e)=>setPP(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Button color='primary' type='submit'>
                                        Register
                                    </Button>
                                </FormGroup>
                                <FormGroup>
                                    <h3>{message}</h3>
                                </FormGroup>
                                <FormGroup>
                                    Already have an account? <a href='/login'>Login</a>
                                </FormGroup>
                            </form>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                        <img src="https://png.pngtree.com/png-clipart/20250420/original/pngtree-social-media-concept-with-various-platform-icons-png-image_20741692.png"
                            width="375px" height="450px" />
                </Col>
            </Row>
        </Container>
    );
};
export default Register;
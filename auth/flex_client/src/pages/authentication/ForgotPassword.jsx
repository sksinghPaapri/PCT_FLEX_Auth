import { React, useContext, useState } from 'react'
import { Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './authentication.css'
import { useController, useForm } from 'react-hook-form'
import ApiService from '../../helpers/ApiServices'
import { FaCheckCircle } from 'react-icons/fa';
import './authentication.css';
import { UserContext } from '../../components/states/contexts/UserContext'

export default function ForgotPassword() {
    const { dispatch, user } = useContext(UserContext)
    const [isResetLinkSent, setIsResetLinkSent] = useState(false);

    const { control, handleSubmit, getValues, setValue, register } = useForm();
    const navigate = useNavigate();
    const [isEmailVerified, setIsEmailVerified] = useState(true);

    const onSubmit = async (data) => {
        console.log(data);
        await ApiService.post('accessControl/forgotPassword', data).then(response => {
            console.log(response);
            if (response.data.status === "success") {
                setIsResetLinkSent(true)
                //navigate('/resetpassword/' + response.data.resetToken);
            }
        }).catch(e => {
            setIsEmailVerified(false);
            // console.log(e);
            // errorMessage(e, dispatch)
        })
    }

    return (
        <Container className="pct-app-container p-0 m-0" fluid>
            <Container className="pct-app-header p-0 m-0" fluid>
                <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#009999' }} variant="dark">
                    <Container fluid>
                        <Navbar.Brand href="/">PCTFlex</Navbar.Brand>
                        <Nav><Nav.Link as={Link} to="/">LOGIN</Nav.Link></Nav>
                    </Container>
                </Navbar>
            </Container>
            {isResetLinkSent && <div className="reset-password-success-container">
                <div className="success-icon">
                    <FaCheckCircle />
                </div>
                <h2>Password Reset Link Sent!</h2>
                <p>A reset password link has been sent to your registered email address.<br></br> Please check your email inbox and follow the instructions to reset your password.</p>

            </div>}
            {!isResetLinkSent && <Container className="pct-app-content-container p-0 m-0" fluid>
                <Container className="pct-app-content" fluid>
                    <Container className="m-0 pb-2" fluid>
                        <Row className="justify-content-md-center">
                            <Col className="password-header">Password Recovery</Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col style={{ textAlign: 'center' }}>
                                <Form.Label className="label" > Enter your registered email</Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ textAlign: 'center' }}>
                                <Form.Control name="email" className="input" {...register("email")} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 5 }}>
                            <Col style={{ textAlign: 'center' }}>
                                <Button className="button" onClick={handleSubmit(onSubmit)}>SUBMIT</Button>
                            </Col>
                        </Row>
                        {!isEmailVerified ? (< Row >
                            <Col style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <h3 style={{ color: 'rgb(255, 74, 74)', fontWeight: '100' }}>Please enter registered email!</h3>
                            </Col>
                        </Row>) : <span></span>}
                    </Container>
                </Container>
            </Container>}
        </Container >
    )
}

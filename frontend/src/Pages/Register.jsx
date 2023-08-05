import { useState , useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux"
import {toast} from "react-toastify"
import Loader from "../components/Loader";
import { useRegisterMutation } from "../store/slices/usersApiSlice";
import { setCredentials } from "../store/slices/authSlice";

function Register() {
  const [nane, setNane] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { userInfo } = useSelector((state) => state.auth ); 
  const navigate = useNavigate();

  useEffect(()=>{
    if (userInfo) {
      navigate('/')
    }
  } , [navigate , userInfo])


  const dispatch = useDispatch();
  const [register , { isLoading}] = useRegisterMutation();

 
  const submitHandler = async (e) => { 
    e.preventDefault();
    if (password !== passwordConfirmation) {
      toast.error("Passwords m4 zay ba3d!")
    }else{
      try {
        const res = await register({ name : nane ,email , password}).unwrap();
        dispatch(setCredentials({
          ...res
        }))
        console.log(res);
      } catch (error) {
        toast.error(error.data.message)
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>

         {/* Nane */}
         <Form.Group className="my-2" controlId="email">
          <Form.Label>Nane</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Nane"
            value={nane}
            onChange={(e) => {
              setNane(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>


        {/* email */}
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        {/* password */}
        <Form.Group className="my-2" controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

         {/* password */}
         <Form.Group className="my-2" controlId="password">
          <Form.Label>password confirmation</Form.Label>
          <Form.Control
            type="password"
            placeholder="password confirmation"
            value={passwordConfirmation}
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Sign up
        </Button>

        <Row className="py-3">
          <Col>
            Already have an account ? <Link to="/login">login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default Register;

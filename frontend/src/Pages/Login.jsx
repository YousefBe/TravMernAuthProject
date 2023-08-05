import { useState , useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux"
import { useLoginMutation } from "../store/slices/usersApiSlice";
import { setCredentials } from "../store/slices/authSlice";
import {toast} from "react-toastify"
import Loader from "../components/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login , { isLoading}] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth ); 
 
  useEffect(()=>{
    if (userInfo) {
      navigate('/')
    }
  } , [navigate , userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email , password}).unwrap();
      dispatch(setCredentials({
        ...res
      }))
      console.log(res);
    } catch (error) {
      toast.error(error.data.message)
      console.log(error.data.message);
    }
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      <Form onSubmit={submitHandler}>
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

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Sign in
        </Button>
        

        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default Login;

import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { login } from './AxiosFunctions';

interface IFormInput {
    username: string,
    password: string
}

export default function LoginForm({ setError, setSuccess }) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        // on submit, post to server with values in the form
        login(data.username, data.password)
            .then(() => {
                setSuccess("Welcome ".concat(data.username, "!!!"));
                navigate("/portfolio");
            })
            .catch(() => {
                setError("Wrong Username / Password");
            });
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col sm={3}>
                    <Form.Control size="lg" {...register("username", {
                        required: true
                    })} placeholder='Username' />
                    {errors.username && <Alert variant="danger" role="usernameError">Error: Username text field is required</Alert>}

                </Col>
                <Col sm={3}>
                    <Form.Control size="lg" {...register("password", {
                        required: true
                    })} placeholder='Password' />
                    {errors.password && <Alert variant="danger" role="passwordError">Error: password, This field is required</Alert>}
                </Col>
            </Row>
            <Button type="submit" >Login</Button>
        </Form>
    );
}
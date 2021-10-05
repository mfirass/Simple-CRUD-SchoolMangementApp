import { Component } from "react";
import { Card, CardBody, CardFooter, CardText, CardTitle, Col, Container, Navbar, NavbarBrand, Row } from "reactstrap";
import {
    IoSchoolOutline,
    IoMan,
    IoSettings,
} from "react-icons/io5"
import Button from "@restart/ui/esm/Button";
import axios from "axios";
import { AddStudentModal } from "./AddStudentModal";

interface MyState{
    students: [];
    isOpen: boolean;
}

export class Dashboard extends Component<{}, MyState>{

    state : MyState = {
        students: [],
        isOpen: false

    }

    componentDidMount() {
        axios.get("http://localhost:7070/list")
            .then(res => {
                const students = res.data
                this.setState({students})
            });
    }

    toggle = () => {
        this.setState((prevState) => ({isOpen : !prevState.isOpen}))
    }

    render() {
        return (
            <div>
                <Navbar color='dark' light mb-2>
                    <NavbarBrand className="text-white">
                        <IoSchoolOutline className="font-size-xxl"/>
                        <span className="font-size-l ml-3">
                            School Manager Application
                        </span>
                    </NavbarBrand>
                </Navbar>
                <Container className="mt-3">
                    <Row>
                        <Col sm='4'>
                            <Card body>
                                <CardTitle tag="h5">
                                    <IoMan className="font-size-xl"/> 86 Student
                                </CardTitle>
                                <CardText>
                                    Our card text, that should match the objectif of management
                                </CardText>
                                <Button className="btn btn-secondary">Manage Students</Button>
                            </Card>
                        </Col>
                        <Col sm='4'>
                            <Card body>
                                <CardTitle tag="h5">
                                    <IoSchoolOutline className="font-size-xl"/> 22 Teacher
                                </CardTitle>
                                <CardText>
                                    Our card text, that should match the objectif of management
                                </CardText>
                                <Button className="btn btn-secondary">Manage Teachers</Button>
                            </Card>
                        </Col>
                        <Col sm='4'>
                            <Card body>
                                <CardTitle tag="h5">
                                    <IoSettings className="font-size-xl"/> 30 Employees
                                </CardTitle>
                                <CardText>
                                    Our card text, that should match the objectif of management
                                </CardText>
                                <Button className="btn btn-secondary">Manage Employees</Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <AddStudentModal isOpen={this.state.isOpen} toggle={ this.toggle }/>

                <Container className="mt-4">
                    <Row>
                        <Col sm='12'className="text-center">
                            <Button className="btn btn-success block" onClick={this.toggle}>
                                <span className="font-size-l">Add New Student</span> 
                            </Button>
                        </Col>
                    </Row>
                </Container>

                <Container className="mt-4">
                    {this.state.students.map(student => renderStudent(student))}
                </Container>
            </div>
        )
    }


}

function renderStudent(s: any){
        return (
            <Row>
                <Col sm="12">
                    <Card body>
                        <CardTitle tag="h5">
                            <IoMan className="font-size-xl" /> {s.firstName+" "+s.lastName}
                        </CardTitle>
                        <CardBody>
                            <Row>
                                <Col sm="4" className="text-center">
                                    <span className="font-weight-bold"><b>Class</b></span>
                                    <span>{ " " }Second Year</span>
                                </Col>
                                <Col sm="4" className="text-center">
                                    <span className="font-weight-bold"><b>Age</b></span>
                                    <span>{" "+s.age }</span>
                                </Col>
                                <Col sm="4" className="text-center">
                                    <span className="font-weight-bold"><b>Teacher</b></span>
                                    <span>{" "+s.teacher} </span>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col sm-6>
                                    <Button className="btn btn-outline-primary block">
                                        Edit
                                    </Button>
                                </Col>
                                <Col sm-6>
                                    <Button className="btn btn-outline-danger block" onClick={()=>deleteStudent(s.id)} >
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        )
}
function deleteStudent(id: String): void {
    axios.post(`http://localhost:7070/delete/${id}`)
    window.location.reload();
}


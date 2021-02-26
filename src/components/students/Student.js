import React,{useState,useEffect} from 'react'
import { Link,useParams } from 'react-router-dom';
import Avatar from '../Layout/Avatar';
import { useFirestore } from 'react-redux-firebase';
import Loader from '../Layout/Loader';

const Student = () => {

    const firestore = useFirestore();
    const [student,setStudent] = useState(null);
    const { id } = useParams();

   

    const loadStudent = async () => {
        try{
            const docRef = firestore.collection("students").doc(id);
            const result = await docRef.get();
            if(result.exists){
                setStudent(result.data())
            }else{
                console.log("No such student!");
            }
        }catch(error){
            console.log("error: ",error);
        }
    }

    useEffect(() => {
        loadStudent();
    },[]);

    if(!student){
        return <Loader />
    }
    return (
        <div>
            <div className="container">
                <div className="py-4">
                    <div className="row">
                        <div className="col-md-10 mx-auto">
                            <div className="card card-body shadow">
                                <div className="row">
                                    <div className="col-md-4">
                                    <Avatar url={`https://i.pravatar.cc/150?img=${id}`} />
                                    </div>
                                    <div className="col-md-8">
                                        <ul className="list-group">
                                            <li
                                                className="d-flex justify-content-between align-items-center list-group-item list-group-item-action"
                                            >
                                                <h3 className="m-0">{student.name}</h3>
                                                <Link className="btn btn-primary" to={`/studentForm/${id}`}>
                                                    Edit Profile
                                                </Link>
                                            </li>
                                            <li className="list-group-item">
                                                <p>Email: {student.email}</p>
                                                <p>Phone: {student.phone}</p>
                                                <p>Class: {student.standard}</p>
                                                <p>Address 1: {student.address1}</p>
                                                <p>Address 2: {student.address2}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Student;

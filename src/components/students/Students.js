import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Avatar from '../Layout/Avatar';
import { useFirestore,useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Loader from '../Layout/Loader';

const Students = () => {

    const firestotre = useFirestore();
    const students = useSelector(state=>state.firestore.ordered.students);
    console.log(students);
    const { id } = useParams();

    useFirestoreConnect([
        {
            collection:"students",
            orderBy:["createdAt","desc"]
        }
    ]);

    if(!students){
        return <Loader />
    }

    const deleteStudent = async (id) => {
        try {
            await firestotre.collection("students").doc(id).delete();
        } catch (error) {
            console.log("Error: ",error);
        }
    }

    return (
        <div className="container">
            <div className="py-4">
                <div className="row">
                    {/* <!-- RUN LOOP HERE --> */}
                    {
                        students.map((student) => (

                            <div className="col-lg-3 col-md-6 mb-4" key = {student.id}>
                            <div className="card shadow text-center py-4">
                            <img src={`https://i.pravatar.cc/150?img=man`} alt="pic" style={{height:"150px",width:"150px",borderRadius:"75px",marginLeft:"50px"}} />
                                    <div className="card-body">
                                    <h5 className="card-title mb-0">{student.name}</h5>
                                    <p className="text-muted small">{student.email}</p>
                                    <Link to={`/student/${student.id}`} className="btn btn-primary btn-profile">
                                        View Profile
                                        </Link>
                                    <button className="btn btn-edit" onClick={() => deleteStudent(student.id)}>
                                        <span className="material-icons">delete_outline</span>
                                    </button>
                                </div>
                            </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
                </div>
    )
}

export default Students

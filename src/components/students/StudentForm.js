import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../Layout/Input';
import { useFirestore } from 'react-redux-firebase';


const StudentForm = () => {
    let history = useHistory();
    const firestore = useFirestore();
    const { id } = useParams();
    // const [image, setImage] = useState("")
    // const [url, setUrl] = useState()
    const docRef = id ? firestore.collection("students").doc(id) : null;
    const [student, setStudent] = useState({
        name: "",
        email: "",
        phone: "",
        standard: "",
        address1: "",
        address2: "",
        // image: url
    })

    // const uploadPic = () => {
    //     const data = new FormData()
    //     data.append("file", image)
    //     data.append("upload_preset", "insta_clone")
    //     data.append("cloud_name", "priyank")
    //     fetch("https://api.cloudinary.com/v1_1/priyank/image/upload", {
    //         method: "post",
    //         body: data
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setUrl(data.url)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    const onInputChange = e => {
        setStudent({ ...student, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (id) {
            loadStudentData()
        }
    }, [id])

    const loadStudentData = async () => {
        try {
            const result = await docRef.get();
            if (result.exists) {
                setStudent(result.data())
            } else {
                alert("No such student!")
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    const SubmitForm = async (e) => {
        e.preventDefault();

        if (id) {
            await docRef.update({ ...student, updatedAt: firestore.FieldValue.serverTimestamp() });
        } else {
            firestore.collection("students").add({ ...student, createdAt: firestore.FieldValue.serverTimestamp() });
            // uploadPic();
        }
        history.push("/");
    }



    return (
        <div>
            <div className="container">
                <div className="py-4">
                    <div className="row">
                        <div className="col-md-10 mx-auto">
                            <div className="card card-body shadow">
                                <form onSubmit={SubmitForm}>
                                    <div className="form-row form-group mb-4">
                                        <div className="col-md-6">
                                            <Input
                                                placeholder="Enter Student Name"
                                                name="name"
                                                value={student.name}
                                                onChange={onInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                placeholder="Enter Student E-mail"
                                                name="email"
                                                value={student.email}
                                                onChange={onInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row form-group mb-4">
                                        <div className="col-md-6">
                                            <Input
                                                placeholder="Enter Student Phone"
                                                name="phone"
                                                value={student.phone}
                                                onChange={onInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                placeholder="Enter Student Class"
                                                name="standard"
                                                value={student.standard}
                                                onChange={onInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row form-group">
                                        <div className="col-md-6">
                                            <Input
                                                placeholder="Enter Student Address Line 1"
                                                name="address1"
                                                value={student.address1}
                                                onChange={onInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                placeholder="Enter Student Address Line 2"
                                                name="address2"
                                                value={student.address2}
                                                onChange={onInputChange}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="file-field input-field">
                                        <div className="btn #64b5f6 blue darken-1">
                                            <span>Upload Profile pic</span>
                                            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path validate" type="text" />
                                        </div>
                                    </div> */}
                                    <button type="submit" className="btn btn-primary">
                                        {
                                            id ? "Update Student" : "Add Student"
                                        }
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentForm

import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Container } from '../Components/Container'
import axios from 'axios'
import { headerTokenConfig } from '../Helpers'

export const ViewProject = () => {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`/projects/${id}`, headerTokenConfig)
            .then((res) => {
                console.log(res)
                setProject(res.data)
            })
            .catch(err => console.error(err))
    }, []);

    const onDelete = () => {
        setProcessing(true)
        axios.delete(`/projects/${id}`,headerTokenConfig)
        .then(res => {
            setProcessing(false)
            navigate('/dashboard');
        })
    }

    return (
        <Layout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                <Link to={'/dashboard'} className='link-secondary'>Projects</Link> / {project?.title}
            </h2>}
        >
            <Container>
                <div className="mt-4">
                    {
                        project ? (
                            <>
                                <div className="text-end">
                                    <div className="flex justify-end gap-2">
                                        <Link className='btn btn-sm btn-success'>Edit</Link>
                                        <button onClick={onDelete} className='btn btn-sm btn-danger'>Delete</button>
                                    </div>
                                </div>
                                <div className="card border-0 shadow-sm mt-4">
                                    <div className="card-body p-4">
                                        <p className='fw-bold fs-5'>{project.title}</p>
                                        <p className='mt-2'>{project.description}</p>
                                    </div>
                                </div>
                                <div className="card border-0 shadow-sm mt-4">
                                    <div className="card-header bg-white">
                                        <div className="flex">
                                            <p className='fw-bold text-primary'>Tasks</p>
                                        </div>
                                    </div>
                                    <div className="card-body p-4">
                                        {
                                            project && project.tasks && (
                                                <>
                                                <div className="table-responsive-sm">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Title</th>
                                                                <th>Description</th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center mt-5">
                                <div className="spinner-border text-primary spinner-border-sm ms-2" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <p className='text-sm text-secondary'>Please wait</p>
                            </div>
                        )
                    }
                </div>
            </Container>
        </Layout>
    )
}

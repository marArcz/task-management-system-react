import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Container } from '../Components/Container'
import { useProcessingState } from '../States'
import axios from 'axios'
import { useAuthStore } from '../AuthStore'
import { Link } from 'react-router-dom'
import { headerTokenConfig } from '../Helpers'

export const Dashboard = () => {
    const { user } = useAuthStore();
    const [fetching, setFetching] = useState(true)
    const [tasks, setTasks] = useState([])
    const [projects, setProjects] = useState([])


    useEffect(() => {
     

        if (user && user.team) {
            setTasks(user.tasks)
            setProjects(user.team?.projects)
        }

    }, [user])

    return (
        <>
            <Layout
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                <Container>
                    <div className="pt-3 pb-3">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <p className="p-6 fs-5 text-gray-900">Welcome to Task Management System!</p>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white">
                            <p className='text-primary fw-bold my-1'>My team</p>
                        </div>
                        <div className="card-body">
                            {
                                !user ? (
                                    <p class="placeholder-wave">
                                        <span class="placeholder col-3"></span>
                                    </p>
                                ) : (
                                    <>
                                        {
                                            user.team ? (
                                                <div>
                                                    <p className='fw-bold fs-5'>{user.team.name}</p>
                                                    <p className='text-dark mt-2'>{user.role.name}</p>

                                                    <div className="mt-3">
                                                        <Link className='link-primary underline' to={`/teams/${user.team_id}/members`}>View team</Link>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className='text-secondary text-sm'>You don't belong to any team yet.</p>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>


                    {/* projects */}
                    {
                        user?.team && (
                            <>
                                <div className="card shadow-sm border-0 mt-3">
                                    <div className="card-header bg-white">
                                        <p className=' fw-bold my-1'>Assigned Tasks</p>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive-sm">
                                            <table className="table align-middle">
                                                <thead>
                                                    <tr>
                                                        <th className='text-secondary'>Title</th>
                                                        <th className='text-secondary'>Description</th>
                                                        <th className='text-secondary'>Due date</th>
                                                        <th className='text-secondary'>Priority</th>
                                                        <th className='text-secondary'>Project</th>
                                                        <th className='text-secondary'>Status</th>
                                                        <th className='text-secondary'>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tasks && tasks.length > 0 ? (
                                                            tasks.map((task, index) => (
                                                                <tr key={task.id}>
                                                                    <td>{task.title}</td>
                                                                    <td>{task.description}</td>
                                                                    <td>{task.dueDateStr}</td>
                                                                    <td>
                                                                        {task.priority.name}
                                                                    </td>
                                                                    <td>
                                                                        {task.status.description}
                                                                    </td>
                                                                    <td>
                                                                        <Link href=''>Edit</Link>
                                                                        <Link href=''>Delete</Link>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan={7} className='text-center text-secondary'>Nothing to show.</td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-0 shadow-sm mt-3 mb-5">
                                    <div className="card-header bg-white">
                                        <div className="d-flex align-items-center">
                                            <p className='my-2 fw-bold me-auto'>Team projects</p>
                                            <Link to={`/teams/${user?.team_id}/projects/create`} className='btn btn-sm btn-success'>Add</Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th className='text-secondary'>Title</th>
                                                    <th className='text-secondary'>Starting Date</th>
                                                    <th className='text-secondary'>Ending Date</th>
                                                    <th className='text-secondary'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    projects && projects.length > 0 ? (
                                                        projects.map((project, index) => (
                                                            <tr key={project.id}>
                                                                <td>{project.title}</td>
                                                                <td>{project.start_date_str}</td>
                                                                <td>{project.end_date_str}</td>
                                                                <td>
                                                                    <div className="flex gap-2 flex-wrap">
                                                                        <Link to={`/projects/${project.id}`} className='btn btn-sm btn-primary'>Open</Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={4} className='text-center text-secondary'>Nothing to show.</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </Container>
            </Layout>
        </>
    )
}

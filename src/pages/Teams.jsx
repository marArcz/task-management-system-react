import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Container } from '../Components/Container'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { headerTokenConfig } from '../Helpers'

export const Teams = () => {
    const [teams, setTeams] = useState([])
    const [fetching, setFetching] = useState(true)
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        axios.get('/teams', headerTokenConfig)
            .then((res) => {
                setTeams(res.data);
                setFetching(false)
            })
            .catch(err => {
                setFetching(false)
                console.error(err);
            })
    }, [])

    const onDelete = (id) => {
        
        setProcessing(true)
        axios.delete(`/teams/${id}`,headerTokenConfig)
        .then(res => {
            setProcessing(false)
            setTeams((teams) => teams.filter((team) => team.id != id));
        })
        .catch(err => {
            setProcessing(false)
            console.error(err)
        })
    }

    return (
        <Layout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teams</h2>}
        >
            <Container>
                <div className="text-end mt-4">
                    <Link to={'/teams/create'} className='btn btn-primary'>Add New</Link>
                </div>
                <div className="card mt-3 border-0 shadow-sm">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className='table align-middle'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Members</th>
                                        <th>Created By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        fetching ? (
                                            <tr>
                                                <td colSpan={5} className='text-center'>
                                                    <div className="spinner-border text-primary spinner-border-sm ms-2" role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                    <p className='text-sm text-secondary'>Please wait</p>
                                                </td>
                                            </tr>
                                        ) : (
                                            <>
                                                {teams && teams.length > 0 ? (
                                                    teams.map((team, index) => (
                                                        <tr key={team.id}>
                                                            <td>{team.name}</td>
                                                            <td>{team.description}</td>
                                                            <td>
                                                                <Link to={`/teams/${team.id}/members`} className='link-primary underline'>{team.members ? team.members.length : 0} member/s</Link>
                                                            </td>
                                                            <td>{team.created_by?.name}</td>
                                                            <td>
                                                                <Link to={`/teams/${team.id}`} className='nav-link my-1 underline text-success' >Edit</Link>
                                                                <button onClick={() => onDelete(team.id)} disabled={processing} className='nav-link my-1 underline text-danger' method='delete'>Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5} className='text-center'>Nothing to show.</td>
                                                    </tr>
                                                )}
                                            </>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Container>

        </Layout>
    )
}

import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { headerTokenConfig } from '../Helpers';
import { Container } from '../Components/Container';
import { useProcessingState } from '../States';

export const TeamMembers = () => {

    const { id } = useParams();
    const [team, setTeam] = useState(null)
    const [fetching, setFetching] = useState(true)
    const {setProcessing} = useProcessingState();

    useEffect(() => {
        axios.get(`/team/${id}/members`, headerTokenConfig)
            .then(res => {
                setFetching(false)
                setTeam(res.data);
            })
    }, [])

    const removeMember = (memberId) => {
        axios.delete(`/teams/${id}/members/${memberId}`)
        .then(res => {

        })
    }


    return (
        <Layout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                <Link className='link-secondary' to={'/teams'}>Team</Link> / {team?.name}
            </h2>}
        >
            <Container>
                <div className="card border-0 shadow-sm mt-4">
                    <div className="card-body">
                        <p className="fs-5 fw-bold">{team?.name}</p>
                        <p className="fs-6">{team?.description}</p>

                        <div className="mt-3">
                            <p className='text-sm text-secondary'>Created By: <span>{team?.created_by?.name}</span></p>
                        </div>
                    </div>
                </div>
                <div className="card border-0 shadow-sm mt-3">
                    <div className="card-header bg-white">
                        <div className="d-flex align-items-center">
                            <p className="my-1 fw-bold me-auto">Members</p>
                            <Link to={`/teams/${id}/members/create`} className='btn btn-sm btn-primary'>Add New</Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className='table align-middle'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    fetching ? (
                                        <tr>
                                            <td colSpan={4} className='text-center'>
                                                <div class="spinner-border text-primary spinner-border-sm ms-2" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                                <p className='text-sm text-secondary'>Please wait</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        <>
                                            {team && team.members && team.members.length > 0 ? (
                                                team.members.map((member, index) => (
                                                    <tr key={member.id}>
                                                        <td>{member.name}</td>
                                                        <td>{member.role.name}</td>
                                                        <td>
                                                            <Link className='nav-link my-1 underline text-danger' method='delete' >Remove</Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className='text-center'>Nothing to show.</td>
                                                </tr>
                                            )}
                                        </>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

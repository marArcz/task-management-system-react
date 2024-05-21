import React, { useEffect, useState } from 'react'
import Layout from '../Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import InputLabel from '../Components/InputLabel';
import axios from 'axios';
import { headerTokenConfig } from '../Helpers';
import { Container } from '../Components/Container';

const AddTeamMember = () => {
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [Team, setTeam] = useState(null)
    const [user_id, setUser_id] = useState('');
    const [role_id, setRole_id] = useState('')
    const [fetching, setFetching] = useState(true)
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/users`, headerTokenConfig)
            .then(res => {
                setUsers(res.data.filter((user) => user.role_id == null));

                axios.get('/roles', headerTokenConfig)
                    .then(res => {
                        setRoles(res.data)
                        setFetching(false)
                    })
            })
            .catch(err => {
                setFetching(false)
                console.error(err)
            })
    }, [])



    const onSubmit = e => {
        e.preventDefault();
        setProcessing(true)
        axios.post(`/team/${id}/members`, {
            user_id, role_id
        },headerTokenConfig).then(res => {
            setProcessing(false)
            navigate(`/teams/${id}/members`);
        })
            .catch(err => {
                setProcessing(false)
                console.error(err)
            })
    }

    return (
        <Layout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Team Member</h2>}
        >
            <Container>
                <div className="text-end mb-3 mt-4">
                    <Link onClick={() => history.back()} className='btn btn-sm btn-danger'>Cancel</Link>
                </div>
                <form onSubmit={onSubmit}>
                    {
                        fetching ? (
                            <div className='py-4 text-center'>
                                <div className="spinner-border text-primary spinner-border-sm ms-2" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <p className='text-sm text-secondary'>Please wait</p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-3">
                                    <InputLabel htmlFor="user-id" value="User" className='mb-2' />
                                    <select className='form-control' name="user_id" id="user-id" value={user_id} onChange={(e) => setUser_id(e.target.value)}>
                                        <option value="">Select One</option>
                                        {
                                            users && users.map((user) => (
                                                <option value={user.id} key={user.id}>{user.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="role" value="Role" className='mb-2'/>
                                    <select className='form-control' name="role_id" id="role" value={role_id} onChange={(e) => setRole_id(e.target.value)}>
                                        <option value="">Select One</option>
                                        {
                                            roles && roles.map((role) => (
                                                <option value={role.id} key={role.id}>{role.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="mt-3">
                                    <button className='btn btn-primary col-12' disabled={processing} type='submit'>Submit</button>
                                </div>
                            </>
                        )
                    }
                </form>
            </Container>
        </Layout>
    )
}

export default AddTeamMember
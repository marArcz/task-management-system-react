import React, { useState } from 'react'
import Layout from '../Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import InputLabel from '../Components/InputLabel'
import TextInput from '../Components/TextInput'
import axios from 'axios'
import { headerTokenConfig } from '../Helpers'

export const CreateTeamProject = () => {

    const { id } = useParams();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [start_date, setStart_date] = useState('')
    const [end_date, setEnd_date] = useState('')
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        setProcessing(true)

        axios.post(`/team/${id}/projects`, {
            title, description,start_date,end_date
        }, headerTokenConfig)
            .then((res) => {
                setProcessing(false);
                navigate('/dashboard');
            })
            .catch(err => {
                setProcessing(false)
                console.error(err)
            })
    }

    return (
        <Layout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create a Team Project</h2>}
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="text-end mb-3">
                    <button disabled={processing} onClick={() => history.back()} className='btn btn-sm btn-danger'>Cancel</button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <InputLabel htmlFor="title" value="Title" />
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            value={title}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <InputLabel htmlFor="description" value="Description" />
                        <textarea name="description" className='form-control' id='description' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                        <InputLabel htmlFor="start_date" value="Start Date" />
                        <TextInput
                            id="start_date"
                            type="date"
                            name="start_date"
                            value={start_date}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setStart_date(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <InputLabel htmlFor="end_date" value="End Date" />
                        <TextInput
                            id="end_date"
                            type="date"
                            name="end_date"
                            value={end_date}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setEnd_date(e.target.value)}
                        />
                    </div>
                    <div className="mt-3">
                        <button disabled={processing} className='btn btn-primary col-12' type='submit'>
                            <span>Submit</span>
                            {processing && (
                                <div class="spinner-border spinner-border-sm ms-2" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

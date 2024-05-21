import React, { useState } from 'react'
import Layout from '../Layout'
import { Link, useNavigate } from 'react-router-dom'
import InputLabel from '../Components/InputLabel'
import TextInput from '../Components/TextInput'
import axios from 'axios'
import { headerTokenConfig } from '../Helpers'

export const CreateTeam = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setProcessing(true)

    axios.post('/teams', {
      name, description
    }, headerTokenConfig)
      .then((res) => {
        setProcessing(false);
        navigate('/teams');
      })
      .catch(err => {
        setProcessing(false)
        console.error(err)
      })
  }

  return (
    <Layout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create a Team</h2>}
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
        <div className="text-end mb-3">
          <button disabled={processing} onClick={() => history.back()} className='btn btn-sm btn-danger'>Cancel</button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <InputLabel htmlFor="name" value="Name" />
            <TextInput
              id="name"
              type="text"
              name="name"
              value={name}
              className="mt-1 block w-full"
              isFocused={true}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <InputLabel htmlFor="description" value="Description" />
            <textarea name="description" className='form-control' id='description' value={description} onChange={e => setDescription(e.target.value)}></textarea>
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

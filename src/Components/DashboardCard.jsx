import React from 'react'

const DashboardCard = ({title,value,bg='bg-white'}) => {
    return (
        <div className="card border-0 shadow-sm">
            <div className={`card-body text-center ${bg} text-light rounded-md`}>
                <p className="fs-3">{value}</p>
                <p className='my-0'>{title}</p>
            </div>
        </div>
    )
}

export default DashboardCard

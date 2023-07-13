import React, { useState, useEffect } from 'react'
import { getServerData } from '../helper/helper'

const ResultTable = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getServerData(import.meta.env.VITE_RESULT_URL, (res) => setData(res))
  }, [])

  return (
    <div>
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Name</td>
            <td>Attempts</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {!data ?? <div>No Data Found </div>}
          {data.map((v, i) => (
            <tr className="table-body" key={i}>
              <td>{v?.username || ''}</td>
              <td>{v?.attempts || 0}</td>
              <td>{v?.points || 0}</td>
              <td>{v?.achieved || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ResultTable

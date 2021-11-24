import React, { useState, useCallback } from 'react'
import axios, { AxiosResponse } from 'axios'

const useAxios = () => {
  const [data, setData] = useState<any | null>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState([])

  const fetchData = async (url: string) => {
    setLoading(true)
    await axios
      .get(url)
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        setError(error)
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  return [data, fetchData, loading, error]
}

export default useAxios

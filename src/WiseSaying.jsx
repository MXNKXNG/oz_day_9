import { useState, useEffect } from "react"

export default function WiseSaying() {
    const apiUrl = "https://korean-advice-open-api.vercel.app/api/advice"
    const { loading, data, error, fetchData } = useFetch(apiUrl)

    return (
        <>
            <div className="wise-saying-container">
                {loading ? (
                    <p>Loding..</p>
                ) : (error ? (
                    alert(error)
                ) : (
                <div className="wise-saying">
                    <p>{data.message}</p>
                    <p>- {data.author} -</p>
                </div>
                ))}
                <button className="wise-btn" onClick={() => fetchData(apiUrl)}>New</button>
            </div>
        </>
    )
}

const useFetch = (url) => {
    const [ loading, setLoading ] = useState(true)
    const [ data, setData ] = useState(null)
    const [ error, setError ] = useState(null)

        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await fetch(url)
                if (!res.ok) {
                    throw new Error(`HTTP 응답 오류 ${res.status}`)
                }
                const data = await res.json()
                setData(data)
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

    useEffect(() => {
        if (url) {
            fetchData()
        }
    }, [url])
    
    return { loading, data, error, fetchData }
}
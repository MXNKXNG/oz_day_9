import { useState, useEffect } from "react"

export default function Time() {
    const [ nowDate, setNowDate ] = useState(() => new Date())
    const week = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]

    useEffect(() => {

        const now = setTimeout(() => {
            setNowDate(new Date())
        }, 1000)

        return (() => {
            clearTimeout(now)
        }) 
    }, [nowDate])


    return <div className="time">{`${nowDate.getFullYear()}년 ${nowDate.getMonth()+1}월 ${nowDate.getDate()}일 ${week[nowDate.getDay(week)]}`}</div>
}


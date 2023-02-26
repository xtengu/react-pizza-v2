import React from 'react'
import axios from 'axios'

import { useParams, useNavigate } from 'react-router-dom'

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl:string;
        title:string;
        price:number;
    }> ({
        imageUrl:'',
        title:'',
        price:0,
    })
    const { id } = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    'https://63bd637ad660062388a3f5d4.mockapi.io/items/' + id
                )
                setPizza(data)
            } catch (error) {
                alert('error fetch 1 pizza')
                navigate('/')
            }
        }
        fetchPizza()
    }, [])

    if (!pizza) {
        return <> 'Loading . . . '</>
    }

    return (
        <div className='container'>
            <img
                src={pizza.imageUrl}
                alt='pizzaImg'
            />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} $</h4>
            Hello ProductCard
        </div>
    )
}

export default FullPizza

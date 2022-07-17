import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { api } from "../../api/Api"

import "react-datepicker/dist/react-datepicker.css";
import NotificationButton from '../notificarion_button'
import "./styles.css"
import { sale } from "../models/Sale";


const initialValues = [
    {
        id: 0,
        date: "teste",
        sellerName: 'teste',
        amount: 0,
        visited: 0,
        deals: 0
    }
]



export default function Card() {
    const min = new Date(new Date().setDate(new Date().getDate() - 365))
    const [startDate, setStartDate] = useState(min);
    const [finalDate, setFinalDate] = useState(new Date());

    const [vendas, setVendas] = useState<Array<sale>>(initialValues);

    async function buscarVendas(minDate: string, dmax: string) {
        api.get(`/sales?minDate=${minDate}&maxDate=${dmax}`)
        .then(response => setVendas(response.data.content))
        .catch(error =>{
            setVendas(initialValues)
            console.log(error);
            
        })
    }

    useEffect(() => {

        const dmin = startDate.toISOString().slice(0,10)
        const dmax = finalDate.toISOString().slice(0,10)

        
        
        buscarVendas(dmin, dmax)

    }, [startDate, finalDate])
    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker className="dsmeta-form-control" selected={startDate} onChange={(date: Date) => setStartDate(date)} dateFormat="dd/MM/yyyy" />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker className="dsmeta-form-control" selected={finalDate} onChange={(date: Date) => setFinalDate(date)} dateFormat="dd/MM/yyyy" />
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992">ID</th>
                            <th className="show576">Data</th>
                            <th>Vendedor</th>
                            <th className="show992">Visitas</th>
                            <th className="show992">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendas.map(venda => (

                            <tr key={venda.id}>
                                <td className="show992">{venda.id}</td>
                                <td className="show576">{new Date(venda.date).toLocaleDateString()}</td>
                                <td>{venda.sellerName}</td>
                                <td className="show992">{venda.visited}</td>
                                <td className="show992">{venda.deals}</td>
                                <td>R$ {venda.amount.toFixed(2)}</td>
                                <td>
                                    <div className="dsmeta-red-btn-container">
                                        <NotificationButton id={venda.id}/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    )
}
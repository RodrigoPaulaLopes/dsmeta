import React from 'react'
import { api } from '../../api/Api'
import icon from "../../assets/img/notification-icon.svg"
import "./styles.css"


type Props = {
    id: number
}
export default function NotificationButton({id}: Props) {

    function enviarSMS(id: number) {
        api.get(`/sales/${id}/notification`)
        .then(response => {
            alert("SMS enviado com sucesso!")
        })
        .catch(error => {
            console.log(error);
            
        })
        
    }
    return(
        <>
            <div className="dsmeta-red-btn" onClick={e => enviarSMS(id)}>
                <img src={icon} alt="Notificar" />
            </div>
        </>
    )
}
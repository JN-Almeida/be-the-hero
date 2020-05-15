import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'
import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function Register() {
    const [incidents, setIncidents] = useState([])

    const history = useHistory();
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incidents => incidents.id !== id));
        }catch (err){
            alert('erro ao deletar, tente novamente!')
        }
    } 

    function handleLogout() {
        localStorage.clear()

        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Bet the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="data-btn" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id }>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>
    
                        <strong>Descrição:</strong>
                        <p>{incidents.description}</p>
    
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>
    
                        <button type="button" onClick={() => handleDeleteIncident(incidents.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
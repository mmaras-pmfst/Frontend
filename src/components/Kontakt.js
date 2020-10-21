import React,{useState} from "react";

const Kontakt=({kontakt,izmjena,brisiKontakt})=>{
    const [ime,postaviIme]=useState(kontakt.imeprezime);
    const [email,postaviEmail]=useState(kontakt.email)
    const izmjena1=(e)=>{
        postaviIme(e.target.value);
        
    }
    const izmjena2=(e)=>{
        postaviEmail(e.target.value);
       
    }
    const spremi=()=>{
        izmjena(ime,kontakt.id,email)
    }
    return(
         <li>
             <strong>Ime i prezime: </strong>
             <input  value={ime} onChange={izmjena1}/>  
             <strong>E-mail: </strong>
             <input  value={email} onChange={izmjena2}/> 
             <button onClick={spremi}>Spremi izmjene</button>
             <button onClick={brisiKontakt}>Brisi</button>
        </li>
        
    );
}
export default Kontakt;
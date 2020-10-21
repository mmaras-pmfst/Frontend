import React,{useState,useEffect} from 'react';
import Kontakt from "./components/Kontakt";
import kontaktiServer from "./services/kontakti";
// import './App.css';

const App=()=>{
  const [kontakti,postaviKontakte]=useState([]);
  const [unosIme,postaviUnos1]=useState("");
  const [unosEmail,postaviUnos2]=useState("");
  const [unosFilter,postaviUnos3]=useState("");
  let konktaktiPrikaz=unosFilter !== "" ? kontakti.filter(k=>k.imeprezime.toLowerCase().includes(unosFilter.toLocaleLowerCase())) : kontakti;

  useEffect(()=>{
    console.log("Effect hook");
    kontaktiServer.dohvatiSve().then(response=>{
      console.log("Kontakti dohvaćeni");
      postaviKontakte(response.data);
    })
  },[])

  const izmjena=(ime,id,email)=>{
    const kontakt=kontakti.find(k=>k.id===id);
    const noviK={...kontakt,imeprezime:ime,email:email}
    kontaktiServer.osvjezi(id,noviK).then(response=>{
      console.log(response.data);
      postaviKontakte(
        kontakti.map(k=>k.id!==id ? k : response.data)
      )
    })
    
  }

  const noviKontakt=(e)=>{
    e.preventDefault();
    const noviObjekt={
      imeprezime:unosIme,
      email:unosEmail
    };
    kontaktiServer.stvori(noviObjekt).then(response=>{
      console.log(response.data);
      postaviKontakte(kontakti.concat(response.data));
      postaviUnos1("");
      postaviUnos2("");
    })
    

  }

  const promjenaUnosa1=(e)=>{
    postaviUnos1(e.target.value);
  }
  const promjenaUnosa2=(e)=>{
    postaviUnos2(e.target.value);
  }
  const promjenaUnosa3=(e)=>{
    postaviUnos3(e.target.value);
  }
  const brisanjeKontakta=(id)=>{
    kontaktiServer.brisi(id).then(response=>{
      console.log(response);
      postaviKontakte(kontakti.filter(k=>k.id!==id))
    })
  }

  return (
    <div>
     <h1>Adresar</h1>
     <hr></hr>
     <h3>Unos novog kontakta</h3>
     <form onSubmit={noviKontakt}>
       <label>
         Ime i prezime:
         <input type="text" className="name" value={unosIme} onChange={promjenaUnosa1}/>
       </label>
       <br />
       <label>
         E-mail:
         <input type="email" className="email" value={unosEmail} onChange={promjenaUnosa2}/>
       </label>
       <br />
       <button type="submit">Dodaj</button>
     </form>
     <hr />
      <h3>Filtriranje po imenu</h3>
      <input type="text" value={unosFilter} onChange={promjenaUnosa3}/>
     <hr />
     <h3>Popis kontakata</h3>
     <ul>
       {konktaktiPrikaz.map(k=>
        <Kontakt 
        key={k.id} 
        kontakt={k} 
        brisiKontakt={()=>brisanjeKontakta(k.id)}
        izmjena={izmjena}/>
      )}
     </ul>
    </div>
  );
}


export default App;

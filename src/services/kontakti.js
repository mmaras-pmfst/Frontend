import axios from "axios";

const osnovniUrl="/api/kontakti";

const dohvatiSve=()=>{
    return axios.get(osnovniUrl);
}

const stvori=noviObjekt=>{
    return axios.post(osnovniUrl,noviObjekt);
}

const osvjezi=(id,noviObjekt)=>{
    return axios.put(`${osnovniUrl}/${id}`,noviObjekt);
}

const brisi=id=>{
    return axios.delete(`${osnovniUrl}/${id}`);
}

export default{
    dohvatiSve:dohvatiSve,
    stvori:stvori,
    osvjezi:osvjezi,
    brisi:brisi
}
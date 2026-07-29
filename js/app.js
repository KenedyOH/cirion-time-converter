
const offsets = {
    peru: 0,
    casos: 5,
    vera: 5,
    occom: 2
};

const plataformas = ['peru','casos','vera','occom'];

let actualizando = false;

function activarCard(nombre){

    plataformas.forEach(p=>{
        document.getElementById('card-'+p).classList.remove('activa');
    });

    document.getElementById('card-'+nombre).classList.add('activa');
}

function formatearFecha(fecha){

    const year = fecha.getFullYear();
    const month = String(fecha.getMonth()+1).padStart(2,'0');
    const day = String(fecha.getDate()).padStart(2,'0');

    return `${year}-${month}-${day}`;
}

function formatearHora(fecha){

    const horas = String(fecha.getHours()).padStart(2,'0');
    const minutos = String(fecha.getMinutes()).padStart(2,'0');

    return `${horas}:${minutos}`;
}

function actualizarDesde(origen){

    if(actualizando) return;

    const fecha = document.getElementById(`${origen}-date`).value;
    const hora = document.getElementById(`${origen}-time`).value;

    if(!fecha || !hora) return;

    activarCard(origen);

    actualizando = true;

    const fechaOrigen = new Date(`${fecha}T${hora}:00`);

    const horaBase = new Date(
        fechaOrigen.getTime() - (offsets[origen] * 60 * 60 * 1000)
    );

    plataformas.forEach(destino=>{

        if(destino === origen) return;

        const resultado = new Date(
            horaBase.getTime() + (offsets[destino] * 60 * 60 * 1000)
        );

        document.getElementById(`${destino}-date`).value = formatearFecha(resultado);
        document.getElementById(`${destino}-time`).value = formatearHora(resultado);

    });

    actualizando = false;
}

plataformas.forEach(plataforma=>{

    document.getElementById(`${plataforma}-date`)
    .addEventListener('change',()=>actualizarDesde(plataforma));

    document.getElementById(`${plataforma}-time`)
    .addEventListener('change',()=>actualizarDesde(plataforma));

    document.getElementById(`${plataforma}-time`)
    .addEventListener('input',()=>actualizarDesde(plataforma));

});

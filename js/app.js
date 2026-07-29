const offsets = {
    peru: 0,
    casos: 5,
    vera: 5,
    occom: 2
};

const plataformas = ["peru", "casos", "vera", "occom"];

let bloqueando = false;

function marcarActiva(plataformaActiva) {

    plataformas.forEach(plataforma => {

        document
            .getElementById(`card-${plataforma}`)
            .classList.remove("activa");

    });

    document
        .getElementById(`card-${plataformaActiva}`)
        .classList.add("activa");
}


function actualizarDesde(origen) {

    if (bloqueando) return;

    const fecha = document.getElementById(`${origen}-date`).value;
    const hora = document.getElementById(`${origen}-time`).value;

    if (!fecha || !hora) return;

    marcarActiva(origen);

    bloqueando = true;

    try {

        const fechaOrigen = new Date(`${fecha}T${hora}`);

        const referencia =
            new Date(
                fechaOrigen.getTime() -
                offsets[origen] * 60 * 60 * 1000
            );

        plataformas.forEach(destino => {

            if (destino === origen) return;

            const fechaDestino =
                new Date(
                    referencia.getTime() +
                    offsets[destino] * 60 * 60 * 1000
                );

            const fechaTexto =
                fechaDestino.toISOString().split("T")[0];

            const horaTexto =
                fechaDestino.toTimeString().slice(0, 5);

            document.getElementById(`${destino}-date`).value = fechaTexto;
            document.getElementById(`${destino}-time`).value = horaTexto;

        });

    } finally {

        bloqueando = false;

    }

}


plataformas.forEach(plataforma => {

    document
        .getElementById(`${plataforma}-date`)
        .addEventListener("change", () => {
            actualizarDesde(plataforma);
        });

    document
        .getElementById(`${plataforma}-time`)
        .addEventListener("input", () => {
            actualizarDesde(plataforma);
        });

});

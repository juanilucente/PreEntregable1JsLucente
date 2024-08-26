document.addEventListener('DOMContentLoaded', () => {
    const txtOp1 = document.getElementById("op1");
    const txtOperador = document.getElementById("operador");
    const txtOp2 = document.getElementById("op2");
    const btnCalcular = document.getElementById("calcular");
    const pResultado = document.getElementById("resultado");
    const historial = document.getElementById("historial");


    cargarHistorial();

    btnCalcular.addEventListener('click', calcular);

    function calcular() {
        const confirmar = confirm("¿Deseas calcular con los valores actuales?");
        if (!confirmar) {
            alert("Operación cancelada.");
            return;
        }

        const operador = txtOperador.value.trim();
        const op1 = parseFloat(txtOp1.value);
        const op2 = parseFloat(txtOp2.value);

        if (!op1 && op1 !== 0 || !op2 && op2 !== 0 || !operador) {
            alert("Por favor, completa todos los campos.");
            pResultado.style.color = "red";
            pResultado.innerText = "Campos incompletos";
            return;
        }

        let resultado;
        switch (operador) {
            case "+":
                resultado = op1 + op2;
                break;
            case "-":
                resultado = op1 - op2;
                break;
            case "*":
                resultado = op1 * op2;
                break;
            case "/":
                if (op2 !== 0) {
                    resultado = op1 / op2;
                } else {
                    alert("No se puede dividir por cero.");
                    pResultado.style.color = "red";
                    pResultado.innerText = "No se puede dividir por cero";
                    return;
                }
                break;
            default:
                alert("Operador no válido. Usa +, -, * o /.");
                pResultado.style.color = "red";
                pResultado.innerText = "Operador no válido";
                return;
        }

        pResultado.style.color = "black";
        pResultado.innerText = "= " + resultado;


        guardarEnHistorial(op1, operador, op2, resultado);
    }

    function guardarEnHistorial(op1, operador, op2, resultado) {
        const historialArray = JSON.parse(localStorage.getItem('historial')) || [];
        historialArray.push({ op1, operador, op2, resultado });
        localStorage.setItem('historial', JSON.stringify(historialArray));
        mostrarHistorial();
    }

    function mostrarHistorial() {
        const historialArray = JSON.parse(localStorage.getItem('historial')) || [];
        historial.innerHTML = historialArray.map(item => {
            return `<li>${item.op1} ${item.operador} ${item.op2} = ${item.resultado}</li>`;
        }).join('');
    }

    function cargarHistorial() {
        mostrarHistorial();
    }
});

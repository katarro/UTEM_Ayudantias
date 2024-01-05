import axios from 'axios'
import { API } from "../../API";

export const useGenerarPdf = () => {

    const generarPDF = async () => {
        console.log("Generar PDF");
        try {
            const response = await axios({
                url: `${API}/api/create-pdf`, // Asegúrate de que la URL coincida con tu configuración del servidor
                method: 'POST',
                responseType: 'blob', // Importante
                data: {
                }
            });

            // Crear un enlace para descargar el PDF
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', 'Seleccionados.pdf'); // cualquier nombre de archivo
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log("Frontend error: ", error);
            if (error.response) {
                // El servidor respondió con un código de estado que cae fuera del rango de 2xx
                console.log("Data:", error.response.data);
                console.log("Status:", error.response.status);
                console.log("Headers:", error.response.headers);
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.log("Request:", error.request);
            } else {
                // Algo sucedió al configurar la solicitud que desencadenó un Error
                console.log('Error', error.message);
            }
        }

    }

    return [generarPDF];
}
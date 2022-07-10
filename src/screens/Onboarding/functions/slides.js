import Slide1 from "../helpers/images/Slide1";
import Slide2 from "../helpers/images/Slide2";
import Slide3 from "../helpers/images/Slide3";

export default [
    {
        id: '1',
        title: "¡Practica desde cualquier lugar!",
        description: "Unicamente necesitas conexion a internet",
        image: (props) => <Slide1 {...props}/>
    },
    {
        id: '2',
        title: "Speaking and listening",
        description: "Secciones donde  tendras que hablar y escuchar",
        image: (props) => <Slide2 {...props}/>
    },
    
    {
        id: '3',
        title: "Indices de desempeño",
        description: "a medida que avanzas obtendras un puntaje",
        image: (props) => <Slide3 {...props}/>
    }
];

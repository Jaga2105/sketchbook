import { useEffect, useRef } from "react";
import styles from "./index.module.css";
const Board = () =>{

    useEffect(()=>{
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    },[])

    const canvasRef = useRef();
    return (
        <canvas ref={canvasRef}>

        </canvas>
    );
}
export default Board;
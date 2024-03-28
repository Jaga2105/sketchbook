import { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
const Board = () =>{

    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const {color, size} = useSelector((state) => state.toolbox[activeMenuItem])
    const canvasRef = useRef();
    const shouldDraw = useRef(false)

    useEffect(()=>{
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        const changeConfig = (color, size) => {
            context.strokeStyle = color
            context.lineWidth = size
        }

        changeConfig(color,size);
        
    },[color,size])

    useLayoutEffect(()=>{
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const beginPath = (x,y) =>{
            context.beginPath()
            context.moveTo(x,y);
        }
        const drawLine = (x,y) =>{
            context.lineTo(x,y);
            context.stroke();
        }
        const handleMouseDown = (e)=>{
            shouldDraw.current = true;
            beginPath(e.clientX, e.clientY)
        }
        const handleMouseMove =(e)=>{
            if(!shouldDraw.current) return;
            drawLine(e.clientX, e.clientY)
        }
        const handleMouseUp = (e) =>{
            shouldDraw.current = false;
        }

        canvas.addEventListener('mousedown', handleMouseDown)
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseup', handleMouseUp)

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseup', handleMouseUp)
        }
    },[])

    
    return (
        <canvas ref={canvasRef}>

        </canvas>
    );
}
export default Board;
import { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "@/constants";
import { actionItemClick } from "@/store/reducers/menuSlice";
const Board = () =>{

    const {activeMenuItem, actionMenuItem} = useSelector((state) => state.menu);
    console.log(activeMenuItem)
    const {color, size} = useSelector((state) => state.toolbox[activeMenuItem])
    const canvasRef = useRef();
    const shouldDraw = useRef(false)
    const drawHistory = useRef([])
    const historyPointer = useRef(0)
    const dispatch = useDispatch();

    useEffect(()=>{
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
            console.log(actionMenuItem)
            const URL = canvas.toDataURL()
            const anchor = document.createElement('a')
            anchor.href = URL
            anchor.download = 'sketch.jpg'
            anchor.click()
        }else  if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
            if(historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1
            if(historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1
            const imageData = drawHistory.current[historyPointer.current]
            console.log(imageData)
            context.putImageData(imageData, 0, 0)
        }
        dispatch(actionItemClick(null))
    },[actionMenuItem, dispatch])

    useEffect(()=>{
        if (!canvasRef.current) return;
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
        const context = canvas.getContext('2d');

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
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
            drawHistory.current.push(imageData)
            historyPointer.current = drawHistory.current.length - 1
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
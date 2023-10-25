import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Board= ()=>{
    const canvasRef= useRef(null);  //cant use the getElementById coz of vertual DOM in react thats why using useRef to access teh component refecrence
    const shouldDraw= useRef(false);

    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const {color,size}= useSelector((state)=>state.toolbox[activeMenuItem])

    useEffect(()=>{
        if(!canvasRef.current) return;
        const canvas=canvasRef.current;
        const context = canvas.getContext('2d');

        const chnageConfig= ()=>{
            context.strokeStyle = color; //set color
            context.lineWidth= size;  //set size
        }

        chnageConfig();
    },[color,size])



    //before the paint effect
    useLayoutEffect(()=>{
        if(!canvasRef.current) return;
        const canvas=canvasRef.current;
        const context = canvas.getContext('2d');  //getCOntext method gets that element's context—the thing onto which the drawing will be rendered.

        //when mounting
        canvas.width= window.innerWidth
        canvas.height= window.innerHeight

        const beginPath = (x,y)=>{
            context.beginPath()   //start
            context.moveTo(x,y);  //from
        }

        const drawLine = (x,y)=>{
            context.lineTo(x,y)  //till
            context.stroke()     //paint
        }
        const handleMouseDown= (e)=>{
            shouldDraw.current=true;
            beginPath(e.clientX,e.clientY)
        }
        const handleMouseMove= (e)=>{
            if(!shouldDraw.current) return
            drawLine(e.clientX,e.clientY);  //paint only till true
        }
        const handleMouseUp= (e)=>{
            shouldDraw.current=false;
        }
        
        canvas.addEventListener('mousedown',handleMouseDown)
        canvas.addEventListener('mousemove',handleMouseMove)
        canvas.addEventListener('mouseup',handleMouseUp)

        return()=>{
            canvas.removeEventListener('mousedown',handleMouseDown)
            canvas.removeEventListener('mousemove',handleMouseMove)
            canvas.removeEventListener('mouseup',handleMouseUp)
        }
    },[])

    console.log(color,size);
    return( 
        <canvas ref={canvasRef}></canvas>
    )
}

export default Board;
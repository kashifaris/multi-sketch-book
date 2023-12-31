import { MENU_ITEMS } from "@/constants";
import { actionItemClick } from "@/slice/menuSlice";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "@/socket";
const Board= ()=>{
    const canvasRef= useRef(null);  //cant use the getElementById coz of vertual DOM in react thats why using useRef to access teh component refecrence
    const shouldDraw= useRef(false);
    const drawHistory= useRef([]);
    const historyPointer= useRef(0);
    const actionMenuItem = useSelector((state) => state.menu.actionMenuItem);
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const {color,size}= useSelector((state)=>state.toolbox[activeMenuItem])
    const dispatch= useDispatch();
    useEffect(()=>{
        if(!canvasRef.current) return;
        const canvas=canvasRef.current;
        const context = canvas.getContext('2d');

        if(actionMenuItem===MENU_ITEMS.DOWNLOAD){
            const URL= canvas.toDataURL()
            const anchor= document.createElement('a')
            anchor.href=URL
            anchor.download= 'sketch.jpg'
            anchor.click();
        } else if(actionMenuItem===MENU_ITEMS.UNDO || actionMenuItem===MENU_ITEMS.REDO){
            if(historyPointer.current>0 && actionMenuItem===MENU_ITEMS.UNDO) historyPointer.current -=1;
            if(historyPointer.current<drawHistory.current.length - 1 && actionMenuItem===MENU_ITEMS.REDO) historyPointer.current +=1;
            const imageData= drawHistory.current[historyPointer.current]
            context.putImageData(imageData,0,0) //start from 0,0
        }

        dispatch(actionItemClick(null)); //will not trigger again even it is in the dependency
    },[actionMenuItem])

    useEffect(()=>{
        if(!canvasRef.current) return;
        const canvas=canvasRef.current;
        const context = canvas.getContext('2d');

        const chnageConfig= (color,size)=>{
            context.strokeStyle = color; //set color
            context.lineWidth= size;  //set size
        }

        const handleChangeConfig= (config)=>{
            chnageConfig(config.color,config.size);
        }
        chnageConfig(color,size);
        socket.on('changeConfig',handleChangeConfig)

        return()=>{
            socket.off('changeConfig',handleChangeConfig)

        }
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
            socket.emit('beginPath',{x:e.clientX,y:e.clientY})
        }
        const handleMouseMove= (e)=>{
            if(!shouldDraw.current) return
            drawLine(e.clientX,e.clientY);  //paint only till true
            socket.emit('drawLine',{x:e.clientX,y:e.clientY})

        }
        const handleMouseUp= (e)=>{
            shouldDraw.current=false;
            const imageData= context.getImageData(0,0, canvas.width,canvas.height);
            drawHistory.current.push(imageData)
            historyPointer.current= drawHistory.current.length-1;
        }

       const handleBeginPath= (path)=>{
            beginPath(path.x,path.y)
        }

      const  handleDrawLine= (path)=>{
            drawLine(path.x,path.y)
        }
        
        canvas.addEventListener('mousedown',handleMouseDown)
        canvas.addEventListener('mousemove',handleMouseMove)
        canvas.addEventListener('mouseup',handleMouseUp)
        
        socket.on("beginPath", handleBeginPath);
        socket.on("drawLine", handleDrawLine);


        return()=>{
            canvas.removeEventListener('mousedown',handleMouseDown)
            canvas.removeEventListener('mousemove',handleMouseMove)
            canvas.removeEventListener('mouseup',handleMouseUp)

            socket.off("beginPath", handleBeginPath);
            socket.off("drawLine", handleDrawLine);
        }
    },[])

    console.log(color,size);
    return( 
        <canvas ref={canvasRef}></canvas>
    )
}

export default Board;
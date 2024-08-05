

export const getModalPosition = <T extends  {x: number, y: number}>(modalPosition: T) : {x: number, y: number} =>{
    let x = modalPosition.x;
        let y = modalPosition.y;
        const modalWidth = 390;
        const modalHeight = 490;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if((x + modalWidth) > viewportWidth){
            x = viewportWidth - modalWidth;
        };

        if(y + modalHeight > viewportHeight){
            y = (viewportHeight - modalHeight) + 200;
        }

        if(x < modalWidth){
            x = modalWidth -100
        }

        if(y < modalHeight){
            y = modalHeight - 100
        }
       return {x, y}
}
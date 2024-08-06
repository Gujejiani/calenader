import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { ElementRef, QueryList } from "@angular/core";


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

  export function parseBetweentime(betweentime: string): { startTime: string, endTime: string } {
    const [start, end] = betweentime.split(' - ');
    return {
      startTime: convertTo24HourFormat(start),
      endTime: convertTo24HourFormat(end)
    };
  }

  export function convertTo24HourFormat(time: string): string {
    const [hour, period] = time.split(' ');
    let [hours, minutes] = hour.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return `${String(hours).padStart(2, '0')}:${String(minutes || 0).padStart(2, '0')}`;
  }


  export function triggerClick(element: HTMLElement) {
    // Create and dispatch a click event
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    element.dispatchEvent(clickEvent);
  }


  export function dropCalculation(event:  CdkDragDrop<string[]>, calendarCells: QueryList<ElementRef>){
    const { x, y } = event.dropPoint;

    let targetElement: HTMLElement | null = null;
    

      calendarCells?.forEach(cell => {
      const rect = cell.nativeElement.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        targetElement = cell.nativeElement;
      }
    });

   
    if (targetElement) {
       triggerClick(targetElement);
    }
  }
import { ComponentType } from "@angular/cdk/portal";

export interface modalConfig {
    component:  ComponentType<unknown> 
    inputs: {
     [key: string]: any
    };
    outputs: {
        [key: string]:  <T extends {}>(arg?: T)=>void 
    };
 
    hasBackDrop?: boolean;
}
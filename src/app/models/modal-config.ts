import { ComponentType } from "@angular/cdk/portal";

export interface modalConfig {
    component:  ComponentType<unknown> 
    inputs: {
     [key: string]: any
    };
    outputs: {
        [key: string]:  ()=>void
    };
 
    hasBackDrop?: boolean;
}
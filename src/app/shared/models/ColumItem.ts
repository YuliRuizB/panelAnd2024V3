import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";
import { GeoPoint } from 'firebase/firestore';


export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<DataItem> | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn<DataItem> | null;
  }

 export interface DataItem {
    turno: string;
    roundTrip: string;
    displayName: string;  
    studentId: string;
    phoneNumber: string;
    email:string;
    status: string ;
  }


  export interface IStopPoint {
    id: string;
    active: boolean;
    description: string;
    geopoint: GeoPoint;
    imageUrl: string;
    name: string;
    order: number;
    rounds:  IRound;
  }
export interface IRound {
    round1?: string;
    round2?: string;
    round3?: string;
    round4?: string;
  }
  
  
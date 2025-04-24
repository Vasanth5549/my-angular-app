import { GridComponent } from "@progress/kendo-angular-grid";

export class GridExt {
    public mySelection: number[] = [];
    gridcomponent: GridComponent;
    e = { Rows: [] };
    Sort() {
      this.gridcomponent.sort = [{ field: 'Freight', dir: 'asc' }];
    }
    UnselectAll() {
      this.mySelection = [];
    }
    SetBinding(prop: string, obj: any) {
      this.gridcomponent[prop] = obj;
    }
    
    PrepareRows(cps) {
      setTimeout(() => {
        cps.forEach((item) => {
          this.e.Rows.push({ Row: { Cells: [item] } });
        });
      },0);
    }
  }
  export class GridLength {
    constructor(pixels?: number);
    constructor(value:number,type: GridUnitType);
    constructor(value?: number,type?: GridUnitType) {
      if(typeof value == 'number')
      this.Value = value;

      if(type)
      {
        switch (type)
        {
          case GridUnitType.Star:
              this.IsStar = true;
              this.IsAbsolute = false;
              this.IsAuto = false;
              break;
          case GridUnitType.Pixel:
              this.IsAbsolute = true;
              this.IsAuto = false;
              this.IsStar = false;
              break;
          default:
            this.IsAuto = true;
            this.IsAbsolute = false;
            this.IsStar = false;
            break;
        }
      }
    }
    static Auto = 'auto';
    GridUnitType: GridUnitType;
    IsAbsolute: boolean;
    IsAuto: boolean;
    IsStar: boolean;
    Value: number;
}
export enum GridUnitType {
    Auto = 0,
    Pixel = 1,
    Star = 2
}

 
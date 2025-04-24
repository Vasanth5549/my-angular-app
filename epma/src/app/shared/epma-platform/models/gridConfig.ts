import { int } from "./eppma-common-types";
import { ObservableCollection } from "./observable-collection";

export class GridConfig {
        
    private ColumnsField: ObservableCollection<Column>;
    
    private SubViewsField: ObservableCollection<SubView>;
    
    private FixedColField :number = 0;
    
    private RowCountField: number = 0;
    
    public get Columns(): ObservableCollection<Column>{
        return this.ColumnsField;
    }
    public set Columns(value){
        if ((this.ColumnsField != value)){
        this.ColumnsField = value;
        }
    }

    public get SubViews(): ObservableCollection<SubView>{
        return this.SubViewsField;
    }
    public set SubViews(value){
        if ((this.SubViewsField != value)){
        this.SubViewsField = value;
        }
    }
    
    public get FixedCol():int{
        return this.FixedColField;
    }
    public set FixedCol(value){
        if ((this.FixedColField != value)){
            this.FixedColField = value;
            }
        
    }
    public get RowCount():int{
        return this.RowCountField;
    }
    public set RowCount(value){
        if ((this.RowCountField != value)){
            this.RowCountField = value;
            }
        
    }
 
    
    // public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
    
    // protected void RaisePropertyChanged(string propertyName) {
    //     System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
    //     if ((propertyChanged != null)) {
    //         propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
    //     }
    // }
} 

export class Column {
    
    private NameField: string ;
    
    private DescriptionField: string ;
    
    private  SortIndexField: int;
    
    private WidthField: int ;
    
    private FixedColumnsField :boolean ;
    
    private DisplayOrderField:int ;
    
    private SortOrderField: int ;
    
    private VisibleField : boolean ;
    
    private MandatoryField:boolean ;
    
    private CellWrapField:boolean ;
    
    private CanResizeField: boolean ;
    
    private ColumnOverrideField:boolean ;
    
    public get Name():string{
        return this.NameField;
    }
    public set Name(value){
        if ((this.NameField != value)){
        this.NameField = value;
        }
    }
    public get Description():string{
        return this.DescriptionField;
    }
    public set Description(value){
        if ((this.DescriptionField != value)){
        this.DescriptionField = value;
        }
    }
    public get SortIndex():int{
        return this.SortIndexField;
    }
    public set SortIndex(value){
        if ((this.SortIndexField != value)){
        this.SortIndexField = value;
        }
    }
    public get Width():int{
        return this.WidthField;
    }
    public set Width(value){
        if ((this.WidthField != value)){
        this.WidthField = value;
        }
    }
    public get FixedColumns():boolean{
        return this.FixedColumnsField;
    }
    public set FixedColumns(value){
        if ((this.FixedColumnsField != value)){
        this.FixedColumnsField = value;
        }
    }
    public get DisplayOrder():int{
        return this.DisplayOrderField;
    }
    public set DisplayOrder(value){
        if ((this.DisplayOrderField != value)){
        this.DisplayOrderField = value;
        }
    }
    public get SortOrder():int{
        return this.SortOrderField;
    }
    public set SortOrder(value){
        if ((this.SortOrderField != value)){
        this.SortOrderField = value;
        }
    }
    public get Visible():boolean{
        return this.VisibleField;
    }
    public set Visible(value){
        if ((this.VisibleField != value)){
        this.VisibleField = value;
        }
    }
    public get Mandatory():boolean{
        return this.MandatoryField;
    }
    public set Mandatory(value){
        if ((this.MandatoryField != value)){
        this.MandatoryField = value;
        }
    }
    public get CellWrap():boolean{
        return this.CellWrapField;
    }
    public set CellWrap(value){
        if ((this.CellWrapField != value)){
        this.CellWrapField = value;
        }
    }
    public get CanResize():boolean{
        return this.CanResizeField;
    }
    public set CanResize(value){
        if ((this.CanResizeField != value)){
        this.CanResizeField = value;
        }
    }
    public get ColumnOverride():boolean{
        return this.ColumnOverrideField;
    }
    public set ColumnOverride(value){
        if ((this.ColumnOverrideField != value)){
        this.ColumnOverrideField = value;
        }
    }
}

export class SubView{
    
    private ColumnsField:ObservableCollection<Column> ;
    
    private  NameField: string;
    public get Columns():ObservableCollection<Column>{
        return this.ColumnsField;
    }
    public set Columns(value){
        if ((this.ColumnsField != value)){
        this.ColumnsField = value;
        }
    }
    public get Name():string{
        return this.NameField;
    }
    public set Name(value){
        if ((this.NameField != value)){
        this.NameField = value;
        }
    }

}
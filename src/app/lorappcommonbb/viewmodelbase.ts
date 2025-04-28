  
export class ViewModelBase /*implements INotifyPropertyChanged {*/ {
  //     public event PropertyChangedEventHandler PropertyChanged;
  //     public NotifyPropertyChanged(propertyName: string): void {
  // if (this.PropertyChanged != null) {
  //   this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
  //         }
  //     }
}

    export interface IViewModelBase {
        DoCleanUP(): void;
}
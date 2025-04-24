import { HelperService } from "epma-platform/soapclient";
import { InjectorInstance } from "../app.module";
import { UserControl } from "../shared/epma-platform/controls/UserControl";
import { MediatorDataService } from "../shared/epma-platform/services/mediator-data.service";

  
    export class AppActivityBB extends UserControl {
        constructor() {
        super();
      
        let _mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
        _mediatorDataService.listenFor(6).subscribe((data:any) => {
          if(data){
           let contextData = data.context;
           switch (contextData.context.event) {
            case 'Discard_Click': this.OnCancel();
            MediatorDataService.cancelClick.next(true);
                       break;
            case 'Finish_Click':
              HelperService.windowCloseFlag = "Finish";
              this.OnFinish();  
              break;
            case 'FinishNow_Click': 
              HelperService.windowCloseFlag = "FinishNow";            
              this.OnFinishNow();  
              break;
           }
          }
        })
            //InitializeComponent();
        }
        OnCancel(){
            console.log('onfinishnow working');
        }
        OnFinish(){
            console.log('onfinishnow working');
        }
        OnFinishNow(){
            console.log('onfinishnow working');
            
        }
    }
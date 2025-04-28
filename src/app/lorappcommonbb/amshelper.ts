import { Exception } from 'epma-platform/models';
import { AMSException } from '../shared/epma-platform/models/AMSException';
import { LzoWizardVmbaseService as LzoWizardVMBase } from '../shared/epma-platform/services/lzo-wizard-vmbase.service';


    export class AMSHelper {
  public static PublishExceptionInfo(
    sender: Object,
    ex: Exception,
    exceptionno?: number
  ) {
    if (arguments.length == 2) {
      this.PublishExceptionInfo1(sender, ex);
    } else {
      this.PublishExceptionInfo2(sender, ex, exceptionno);
    }
  }
  public static PublishExceptionInfo1(sender: Object, ex: Exception): void {
            AMSHelper.PublishException(sender, ex, 10001);
        }
  public static PublishExceptionInfo2(
    sender: Object,
    ex: Exception,
    exceptionno: number
  ): void {
            AMSHelper.PublishException(sender, ex, exceptionno);
        }
  private static PublishException(
    sender: Object,
    ex: Exception,
    exceptionno: number
  ): void {
            let oVMBase: LzoWizardVMBase = new LzoWizardVMBase();
            oVMBase.ErrorID = exceptionno;
            oVMBase.ErrorMessage = ex.Message;
            oVMBase.StackTrace = ex.StackTrace;
            oVMBase.LogError();
        }
  public static PublicExceptionDetails(
    ErrorID: number,
    Source: string,
    ex: Exception
  ): number {
            let ex1: LzoWizardVMBase = new LzoWizardVMBase();
            ex1.ErrorID = ErrorID;
            ex1.Source = Source;
            ex1.ErrorMessage = ex.Message;
            ex1.StackTrace = ex.StackTrace;
            ex1.LogError();
            //Not Required for LHS. To be Re-Visited.
           // let lnReturn: number = AMSHelper.PublishProblemInfo(ex1);
           let lnReturn: number = 1;
            return lnReturn;
        }
    }
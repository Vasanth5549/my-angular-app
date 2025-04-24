import { StringComparison } from 'epma-platform/models';
import { iBusyIndicator } from '../shared/epma-platform/services/busyIndicator.service';
import { CommonVariables } from './utilities/common';
  
    export class Busyindicator {
  public static SetStatusBusy(sKey: string, HideCancelButton?: boolean) {
    if (arguments.length == 1) {
      this.SetStatusBusy1(sKey);
    } else {
      this.SetStatusBusy2(sKey, HideCancelButton);
    }
  }
  public static SetStatusBusy1(sKey: string): void {
            iBusyIndicator.Start(sKey);
    if (
      'FormViewer'.Equals(sKey, StringComparison.OrdinalIgnoreCase) ||
      'FormViewerClick'.Equals(sKey, StringComparison.OrdinalIgnoreCase) ||
      'PresChartAmend'.Equals(sKey, StringComparison.OrdinalIgnoreCase)
    ) {
                CommonVariables.FormViewerIsInProgress = true;
            }
        }
        public static SetStatusIdle(sKey: string): void {
            iBusyIndicator.Stop(sKey);
    if (
      'FormViewer'.Equals(sKey, StringComparison.OrdinalIgnoreCase) ||
      'FormViewerClick'.Equals(sKey, StringComparison.OrdinalIgnoreCase) ||
      'PresChartAmend'.Equals(sKey, StringComparison.OrdinalIgnoreCase)
    ) {
                CommonVariables.FormViewerIsInProgress = false;
            }
        }
  public static SetStatusBusy2(sKey: string, HideCancelButton: boolean): void {
            iBusyIndicator.Start(sKey, HideCancelButton);
    if (
      'FormViewer'.Equals(sKey, StringComparison.OrdinalIgnoreCase) ||
      'FormViewerClick'.Equals(sKey, StringComparison.OrdinalIgnoreCase) ||
      'PresChartAmend'.Equals(sKey, StringComparison.OrdinalIgnoreCase)
    ) {
                CommonVariables.FormViewerIsInProgress = true;
            }
        }
    }
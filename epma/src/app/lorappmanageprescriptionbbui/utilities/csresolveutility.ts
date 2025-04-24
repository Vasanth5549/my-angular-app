import { Component, OnInit } from '@angular/core';
import {
  StringBuilder,
  ProfileFactoryType,
  ContextManager,
  Convert,
  AppActivity,
} from 'epma-platform/services';
import {
  Level,
  ProfileContext,
  OnProfileResult,
  IProfileProp,
  Byte,
  Decimal,
  decimal,
  Double,
  Float,
  Int64,
  long,
  Long,
  StringComparison,
  AppDialogEventargs,
  AppDialogResult,
  DelegateArgs,
  DialogComponentArgs,
  WindowButtonType,
  HtmlPage,
} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService } from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import {
  MessageEventArgs,
  MessageBoxResult,
  iMessageBox,
  MessageBoxButton,
  MessageBoxType,
  MessageBoxDelegate,
} from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CMedConstants, PrescriptionItemStatusCodes } from './constants';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { IsAnyDrugContainGivenIngredientCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS';

export class csResolveUtility {
  public GetRsnMfyForDisCanItem(
    oDataView: PrescriptionItemVM,
    PresitemOid: number
  ): string[] {
    let RsnFormfy: string[] = new Array(2);
    if (
      oDataView.PrescriptionItemOID != 0 &&
      oDataView.PrescriptionItemOID == PresitemOid &&
      String.Compare(
        oDataView.PrescriptionItemStatus,
        PrescriptionItemStatusCodes.DISCONTINUED,
        StringComparison.OrdinalIgnoreCase
      ) != 0 &&
      String.Compare(
        oDataView.PrescriptionItemStatus,
        PrescriptionItemStatusCodes.CANCELLED,
        StringComparison.OrdinalIgnoreCase
      ) != 0 &&
      String.Compare(
        oDataView.PrescriptionItemStatus,
        CMedConstants.CA_AMEND
      ) == 0
    ) {
      RsnFormfy[0] =
        oDataView.FormViewerDetails.BasicDetails.ReasonforModification.DisplayText;
      RsnFormfy[1] =
        oDataView.FormViewerDetails.BasicDetails.ModificationComments;
      return RsnFormfy;
    }
    return RsnFormfy;
  }
  public async DischargeSummary(
    out1: (IsTypeExist: string) => void,
    SEncOID: string,
    SPatOID: string
  ): Promise<void> {
    let IsTypeExist: string;
    IsTypeExist = 'false';
    IsTypeExist = await ObjectHelper.CreateType<string>(
      HtmlPage.Window.InvokeAsync('AjaxDischargeSummary', SEncOID, SPatOID),
      'string'
    );
    out1(IsTypeExist);
  }
}

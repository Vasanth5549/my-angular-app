import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, EventArgs } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ChartIcon } from './ChartIcon';
import { InfusionChartCell } from './InfusionChartCell';
import { InfusionChartRow } from './InfusionChartRow';
import { DrugItem } from './DrugItem';
import { INotifyPropertyChanged } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';
import { InfusionChartColumn } from './InfusionChartColumn';
  ﻿
    export class InfusionTagObject extends EventArgs /*implements INotifyPropertyChanged*/ {
        // public event PropertyChangedEventHandler PropertyChanged;
        // public NotifyPropertyChanged(info: String): void {
        //     if (PropertyChanged != null) {
        //         PropertyChanged(this, new PropertyChangedEventArgs(info));
        //     }
        // }
        private _oChartCell: InfusionChartCell;
        private _oInfusionChartRow: InfusionChartRow;
        private _IsSelected: boolean = false;
        public oChartIcon: ChartIcon;
        public oDrugItem: DrugItem;
        public get oChartCell(): InfusionChartCell {
            return this._oChartCell;
        }
        public set oChartCell(value: InfusionChartCell) {
            this._oChartCell = value;
            //this.NotifyPropertyChanged("oChartCell");
        }
        public get oInfusionChartRow(): InfusionChartRow {
            return this._oInfusionChartRow;
        }
        public set oInfusionChartRow(value: InfusionChartRow) {
            this._oInfusionChartRow = value;
        }
        public oChartColumn: InfusionChartColumn;
        public get IsSelected(): boolean {
            return this._IsSelected;
        }
        public set IsSelected(value: boolean) {
            this._IsSelected = value;
        }
    }

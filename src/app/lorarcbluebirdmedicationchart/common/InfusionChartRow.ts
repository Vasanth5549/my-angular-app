import { Component, OnInit, TemplateRef } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection } from 'epma-platform/models';
import { AppDialog, Colors, SolidColorBrush } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { DrugItem } from './DrugItem';
import { InfusionChartCell } from './InfusionChartCell';
    export class InfusionChartRow {
        public drugItemRef:TemplateRef<any>;
        public Key: string;
        public InfusionChartCells: ObservableCollection<InfusionChartCell>;
        public DrugItem: DrugItem;
        private oRowBackground: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        public get RowBackground(): SolidColorBrush {
            return this.oRowBackground;
        }
        public set RowBackground(value: SolidColorBrush) {
            this.oRowBackground = value;
        }
        public RowHeight: number;
        private oLogicalGrouping: boolean = false;
        public get LogicalGrouping(): boolean {
            return this.oLogicalGrouping;
        }
        public set LogicalGrouping(value: boolean) {
            this.oLogicalGrouping = value;
        }
        private oSequentialStart: boolean = false;
        public get SequentialStart(): boolean {
            return this.oSequentialStart;
        }
        public set SequentialStart(value: boolean) {
            this.oSequentialStart = value;
        }
        private oSequentialEnd: boolean = false;
        public get SequentialEnd(): boolean {
            return this.oSequentialEnd;
        }
        public set SequentialEnd(value: boolean) {
            this.oSequentialEnd = value;
        }
        private _RowIndex: number = 0;
        public get RowIndex(): number {
            return this._RowIndex;
        }
        public set RowIndex(value: number) {
            this._RowIndex = value;
        }
    }

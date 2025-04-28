//THis class needs implementation based on bug #36035

import TimeSpan from "epma-platform/TimeSpan";
import { BitmapImage } from "epma-platform/controls";
import { Inline } from "src/app/shared/epma-platform/index.chart";

export class ToastNotification{
    ShowMessage(src: BitmapImage, arg1: Inline[]) {
        throw new Error('Method not implemented.');
    }
    static CreateToast(arg0: TimeSpan): ToastNotification {
        throw new Error('Method not implemented.');
    }

}
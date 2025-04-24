export class Style {
  TargetType: string;
  Key: string;
}

export const StyleResources = [
  { DrugFluidName: { TargetType: '', Key: 'DrugFluidName' } },
  { DrugName: { TargetType: '', Key: 'DrugName' } },
  { DrugInfusionType: { TargetType: '', Key: 'DrugInfusionType' } },
  { DrugNonInflbl: { TargetType: '', Key: 'DrugNonInflbl' } },
  { DrugNonInfValue: { TargetType: '', Key: 'DrugNonInfValue' } },
  { DrugDueRecordAt: { TargetType: '', Key: 'DrugDueRecordAt' } },
  { HeaderCellStyle: { TargetType: '', Key: 'HeaderCellStyle'} },
  { CellStyle: { TargetType: '', Key: 'CellStyle'} }
];

export class App {
  clsobj = new Style();
  clsobj1 = new Style();
  clsobj2 = new Style();
  clsobj3 = new Style();
  clsobj4 = new Style();
  clsobj5 = new Style();
  clsobj6 = new Style();
  clsobj7 = new Style();

  static Current = {
    Resources: {
      DrugFluidName: { TargetType: 'TextBlock', Key: 'DrugFluidName' },
      DrugName: { TargetType: 'TextBlock', Key: 'DrugName' },
      DrugInfusionType: { TargetType: 'TextBlock', Key: 'DrugInfusionType' },
      DrugNonInflbl: { TargetType: 'TextBlock', Key: 'DrugNonInflbl' },
      DrugNonInfValue: { TargetType: 'TextBlock', Key: 'DrugNonInfValue' },
      DrugDueRecordAt: { TargetType: 'TextBlock', Key: 'DrugDueRecordAt' },
      HeaderCellStyle: { TargetType: 'iGridViewDataColumn', Key: 'HeaderCellStyle' },
      CellStyle: { TargetType: 'iGridViewDataColumn', Key: 'CellStyle' }
    },
  };
  constructor() {
    this.clsobj.TargetType = 'TextBlock';
    this.clsobj.Key = 'DrugFluidName';
    App.Current.Resources['DrugFluidName'] = this.clsobj;
    this.clsobj1.TargetType = 'TextBlock';
    this.clsobj1.Key = 'DrugName';
    App.Current.Resources['DrugName'] = this.clsobj1;
    this.clsobj2.TargetType = 'TextBlock';
    this.clsobj2.Key = 'DrugInfusionType';
    App.Current.Resources['DrugInfusionType'] = this.clsobj2;
    this.clsobj3.TargetType = 'TextBlock';
    this.clsobj3.Key = 'DrugNonInflbl';
    App.Current.Resources['DrugNonInflbl'] = this.clsobj3;
    this.clsobj4.TargetType = 'TextBlock';
    this.clsobj4.Key = 'DrugNonInfValue';
    App.Current.Resources['DrugNonInfValue'] = this.clsobj4;
    this.clsobj5.TargetType = 'iLabel';
    this.clsobj5.Key = 'DrugDueRecordAt';
    App.Current.Resources['DrugDueRecordAt'] = this.clsobj5;
    this.clsobj6.TargetType = 'iGridViewDataColumn';
    this.clsobj6.Key = 'HeaderCellStyle';
    App.Current.Resources['HeaderCellStyle'] = this.clsobj6;
    this.clsobj7.TargetType = 'iGridViewDataColumn';
    this.clsobj7.Key = 'CellStyle';
    App.Current.Resources['CellStyle'] = this.clsobj7;
  }
}


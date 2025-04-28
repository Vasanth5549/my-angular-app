fs = require("fs");
const { series, task } = require("gulp");
args = require("yargs").argv;
const folder = ["./src/**/**/."];
var log = require('fancy-log');

var fileName;
var fileContent;
var folderName ;

function setFileName(done) {
  fileName = args.fileName;
  done();
}
function setFolderName(done) {
  folderName = args.folderName;
  // log(args)
  log(folderName)  
  fs.readdir(folderName, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
      fileName = folderName+'\\'+file;
      log(file);
     let done = function (){}
     if(file.indexOf('.ts')>0){
       setFileContent(done);
       replaceNumberTryParse(done);
       replaceString(done);
       replaceCreateObject(done);
       replaceDateString(done);
       replaceAsToCreateType(done);
       replacevar(done);
       appendimport(done);
       replaceforeach(done);
        replaceDelegates(done);        
        replacemoduleisoft(done);
        replaceSOAPClient(done);
        replaceReferenceEquals(done);
        replaceNameSpace(done);
        replacinnerexception(done);
        replacecatch(done);
        replacetypeof(done);
        commentDelegateDeclaration(done);
        replaceMinDateNotEquals(done);
        replaceMinDateEquals(done);
        writeToFile(done);
      }
    });
});
  done();
}
function setFileContent(done) {
  fileContent = fs.readFileSync(fileName, "utf8");
  done();
}
function replaceNumberTryParse(done) {
  fileContent = fileContent.replace(
    RegExp(/number.TryParse\(/g),
    "Number.TryParse("
  );
  done();
}
function replaceString(done) {
  fileContent = fileContent.replace(RegExp(/\bstring\./g), "String.");
  done();
}
function replaceCreateObject(done) {
  fileContent = fileContent.replace(
    RegExp(/\b__init\b/g),
    "ObjectHelper.CreateObject"
  );
  done();
}
function replaceDateString(done) {
  let regex_1, regex_2, regex_3, regex_4, regex_5, regex_6;
  regex_1 = RegExp(/\s(\bDate\b)\s/g); // var currDate: Date = ""; => var currDate: DateTime = "";
  fileContent = fileContent.replace(regex_1, " DateTime");
  regex_2 = RegExp(/\s(\bDate\b)/g); //  (value: Date) => (value: DateTime)
  fileContent = fileContent.replace(regex_2, " DateTime");
  regex_3 = RegExp(/\s(\bDate;)/g); //  var currDate: Date; => var currDate: DateTime;
  fileContent = fileContent.replace(regex_3, " DateTime;");
  regex_4 = RegExp(/(\b<Date>)/g); //  List<Date> => List<DateTime>
  fileContent = fileContent.replace(regex_4, "<DateTime>");
  regex_5 = RegExp(/(\bDate.\b)/g); //  Date.MinValue => DateTime.MinValue
  fileContent = fileContent.replace(regex_5, "DateTime.");
  regex_6 = RegExp(/(\b:Date\b)/g);
  fileContent = fileContent.replace(regex_6, ":DateTime");

  // above piece of code optimized
  // fileContent = fileContent
  //   .replace(RegExp(/\s(\bDate\b)\s/g), " DateTime")
  //   .replace(RegExp(/\s(\bDate\b)/g), " DateTime")
  //   .replace(RegExp(/\s(\bDate;)/g), " DateTime;")
  //   .replace(RegExp(/(\b<Date>)/g), "<DateTime>")
  //   .replace(RegExp(/(\bDate.\b)/g), "DateTime.")
  //   .replace(RegExp(/(\b:Date\b)/g), ":DateTime");
  done();
}
function replaceAsToCreateType(done) {
  fileContent = fileContent.replace(RegExp(/\b__as__\b/g), "ObjectHelper.CreateType");
  done();
}
function replacevar(done) {
  fileContent = fileContent.replace(RegExp(/\bvar\s/g), "let ");
  done();
}
function appendimport(done) {
  let imports = `import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
  `;
  fileContent = imports + fileContent.toString();
  done();
}

function replaceDelegates(done) {
  let regex_1, regex_2, regex_3;

  regex_1 = RegExp(/\+= new .*?<.*?>\((.*?)\);/g);
  fileContent = fileContent.replaceAll(regex_1, " = (s,e) => { $1(s,e); } ;");

  regex_2 = RegExp(/\+= new .*?\((.*?)\);/g);
  fileContent = fileContent.replaceAll(regex_2, " = (s,e) => { $1(s,e); } ;");

  regex_3 = RegExp(/, new EventHandler<.*?>\((.*?)\)/g);
  fileContent = fileContent.replaceAll(regex_3, " , (s,e) => { $1(s,e); } ");

  done();
}


function replaceSOAPClient(done) {
  let regex_1;
  regex_1 = RegExp(/\= new (.*?)\(BindingObject.GetBasicHttpBindingObject\(\), new EndpointAddress\((.*?)\)\);/g);
  fileContent = fileContent.replaceAll(regex_1, "= new $1();");
  done();
}

function replaceReferenceEquals(done) {
  fileContent = fileContent.replace(RegExp(/ReferenceEquals\(/g), "Helper.ReferenceEquals(");
  done();
}

function replaceNameSpace(done) {

  const namespaces = ["System.Collections.ObjectModel.",
    "iSOFT.BlueBird.Wizard.",
    "iSOFT.BlueBird.TimeZone.",
    "iSOFT.LORENZO.BlueBird.Profiles.",
    "iSOFT.LORENZO.Bluebird.Common.",
    "iSOFT.LORENZO.Medication.IPPMA.Common.ViewModel.",
    "iSOFT.LORENZO.Bluebird.Common.Application.",
    "iSOFT.SilverLight.CDCSLControl.",
    "iSOFT.LORENZO.BlueBird.Controls.",
    "iSOFT.LORENZO.Medication.IPPMA.Common.",
    "iSOFT.LORENZO.MedicationMgmt.MedicationAdmin.",
    "iSOFT.LORENZO.Medication.IPPMA.Conflict.",
    "iSOFT.Lorenzo.BlueBird.FrameWork.",
    "iSOFT.LORENZO.Medication.IPPMA.Common.Resource.",
    "iSOFT.LORENZO.Bluebird.Common.Application.CommonBB.",
    "iSOFT.LORENZO.MedicationMgmt.MedicationAdmin.BlueBird.WebUI.",
    "iSOFT.LORENZO.ManagePrescription.BlueBird.WebUI.",
    "iSOFT.BlueBird.Wizard.ProfileFactoryType.",
    "iSOFT.LORENZO.BlueBird.Proxy.MedicationMgmt.IPPMA."];
  namespaces.forEach(
    namespace => removeNameSpace(namespace)
  )
  done();
}

function removeNameSpace(namespace) {
  fileContent = fileContent.replace(RegExp(namespace, 'g'), "");
}

function replaceMinDateNotequals(done) {
  fileContent = fileContent.replaceAll(RegExp(/\s?!=\s?DateTime.MinValue/g), ".NotEquals(DateTime.MinValue)");
  done();
}

function replaceMinDateEquals(done) {
  fileContent = fileContent.replaceAll(RegExp(/\s?==\s?DateTime.MinValue/g), ".Equals(DateTime.MinValue)"); 
  console.log('equals replaced ');
  done();
}

function replacetypeof(done) {
  let regex_1;
  regex_1 = new RegExp(/\= \/\*typeof\*\/([a-zA-Z.]*)/g);
  fileContent = fileContent.replaceAll(regex_1, "= typeof($1)");
  done();
}

function commentDelegateDeclaration(done) {
  let regex_1;
  regex_1 = new RegExp(/public delegate ([a-zA-Z]*) (.*)\((.*)\)/g);

  const array = [...fileContent.matchAll(regex_1)];

  array.map(m => {
    replaceevent(m[2]);
  });

  fileContent = fileContent.replaceAll(regex_1, "//public delegate $1 $2($3)");
  done();
}

function replaceevent(delegate) {

  let regex_1, regex_2;

  regex_1 = RegExp("public event" + " " + delegate + " " + "(.*);", 'g')
  fileContent = fileContent.replaceAll(regex_1, "public $1: Function;");

  regex_2 = RegExp("public static event" + " " + delegate + " " + "(.*);", 'g')
  fileContent = fileContent.replaceAll(regex_2, "public static $1: Function;");
}


function writeToFile(done) {
  fs.writeFileSync(fileName, fileContent);
  done();
}


function replaceforeach(done) {
  log("fileName", fileName)
  fileContent = fileContent.replace(new RegExp(/.forEach\(\s?function\s?\((.*?)\)/g), ".forEach( ($1)=>");
  done();
}

function replacemoduleisoft(done) {
  let modifiedFileContent = /module\s?iSOFT.+\s?{/g.test(fileContent) ? fileContent.replace(new RegExp(/module\s?iSOFT.+\s?{/g), "") : fileContent;
  fileContent = modifiedFileContent.trim().slice(0, modifiedFileContent.length - 1);
  done();
}

function replacecatch(done) {
  fileContent = fileContent.replace(RegExp(/\s?catch\s?\(\ex\)/g), "catch(ex:any) ");
  done();
}

function replacinnerexception(done) {
  fileContent = fileContent.replace(RegExp(/var\s?i:string(.*)e.InnerException.tostring()/g), "var i:string=e.message.ToString()");
  done();
}

// tasks
task(
  "replace-all",
  series(
    setFileName,
    setFileContent,
    replaceNumberTryParse,
    replaceString,
    replaceCreateObject,
    replaceDateString,
    replaceAsToCreateType,
    replacevar,
    appendimport,
    replaceforeach,
    replaceDelegates,    
    replacemoduleisoft,
    replaceSOAPClient,
    replaceReferenceEquals,
    replaceNameSpace,
    replacecatch,
    replacinnerexception,
    replacetypeof,
    commentDelegateDeclaration,
    replaceMinDateNotequals,
    replaceMinDateEquals,
    writeToFile
    )
);
task(
  "replace-folder-files",
  setFolderName
);

task(
  "replace-mindate",
  series(  
  setFileName,
  setFileContent,
  replaceMinDateNotequals,
  replaceMinDateEquals,  
  writeToFile)
);

// test checkin
// Execution steps
// -> open terminal
// -> Enter the following command to execute the gulp file.
//      -> sample pattern -> gulp gulpTaskName --fileNameVariable filePath
//      -> sample command -> gulp replace-all --fileName ./src/medTechvalProdOptVM.ts
//      -> sample command-> gulp replace-folder-files  --folderName C:\gulptest\viewmodel
//      -> sample command-> gulp replace-mindate --fileName ./src/app/lorappmanageprescriptionbbui/viewmodel/BasicDetailsVM.ts
//                          gulp replace-mindate --fileName  ./src/app/lorappmanageprescriptionbbui/viewmodel/ippmabasevm.ts
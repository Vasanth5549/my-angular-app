
const { start } = require('repl');
const { Builder, By, Key, until,Select } = require('selenium-webdriver');
require('iedriver');
var webdriver = require('selenium-webdriver');
//const { Options } = require('selenium-webdriver/ie');
async function run()
{
  var driver = new webdriver.Builder().forBrowser('internet explorer').build();
 driver.get('https://classic-mm-dem-p4c-20-219-128-169.nip.io/');//baseurl
console.log("url launched");
driver.sleep(10000);
console.log("finding element");
var s = await driver.findElement(By.id('txtuname'));
console.log("element found");
s.sendKeys(714489)
console.log(s);
//driver.findElement(By.id('txtuname')).sendKeys(714489);//userid
driver.findElement(By.id('txtpwd')).sendKeys("Apollo@123");//password
driver.findElement(By.id('btnsubmit')).click();//login button click
driver.manage().window().maximize();
}
run();
// driver.manage().setTimeouts({implicit:4000})
// driver.sleep(3000);
//pop up handle (using js)--task to handle
// driver.wait(until.alertIsPresent());
// let alert = driver.switchTo().alert();
// alert.accept();
// driver.actions().sendKeys(Key.ENTER);
// driver.switchTo().alert().accept();

//  driver.quit();



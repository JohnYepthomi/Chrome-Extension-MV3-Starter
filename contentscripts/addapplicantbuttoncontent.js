chrome.runtime.sendMessage({ message: "online.vfsglobal.dz-addapplicantbutton" }, function (response) {
  //s
  console.log("Injection success message sent to popup");
});

//addapplicantbuttonpage url:"https://online.vfsglobal.dz/Global-Appointment/Applicant/ApplicantList"

(async function initiateIIFE() {
  await addApplication();
})();

async function addApplication(){
  await WaitForXpath("/html/body/div[2]/div[1]/div[3]/div[2]/a");
  customxpath("/html/body/div[2]/div[1]/div[3]/div[2]/a").click();  //Add Applicant Button
}

async function waitFor(delay) {
  console.log("delayed for : " + delay);
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

async function waitForSelector(selector){
  return await new Promise((resolve, reject) => {
    let count = 1;
    let timer = setInterval(() => {
      let seconds = millisToMinutesAndSeconds(count * 100);

      if (customselector(selector) !== null || seconds === "10") {
        clearInterval(timer);
        console.log("wairForSelector resolved");
        resolve();
      }

      count++;
    }, 100);

    function millisToMinutesAndSeconds(millis) {
      //var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return seconds;
    }
  });
}

async function WaitForXpathWithTimer(selector) {
  return await new Promise((resolve, reject) => {
    let count = 1;
    let timer = setInterval(() => {
      let seconds = millisToMinutesAndSeconds(count * 100);

      if (customxpath(selector) !== null || seconds === "10") {
        clearInterval(timer);
        console.log("wairForXPath resolved");
        resolve();
      }

      count++;
    }, 100);

    function millisToMinutesAndSeconds(millis) {
      //var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return seconds;
    }
  });
}

async function WaitForXpath(selector) {
  return await new Promise((resolve, reject) => {
    let timer = setInterval(() => {
      if (customxpath(selector) !== null) {
        clearInterval(timer);
        console.log("wairForXPath resolved");
        resolve();
      }
    }, 100);
  });
}

function customxpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

function customselector(selector){
  //a
  return document.querySelector(selector);
}

async function asyncStorageGet(item) {
  var getValue = new Promise(function (resolve, reject) {
    chrome.storage.local.get(item, (data) => {
      console.log(
        "%c StorageItem Retreived Sucessfully",
        "color: brown; font-style: italic"
      );
      resolve(data[item]);
    });
  });

  let gV = await getValue;
  return gV;
}

async function AsyncStorageSet(item) {
  new Promise(function (resolve, reject) {
    chrome.storage.local.set(item, () => {
      console.log(
        `%c StorageItem set ${{ item }} Sucessfully`,
        "color: brown; font-style: italic"
      );
      resolve();
    });
  });
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

try {

  clearCookies();

  chrome.runtime.onMessage.addListener(async function (
    request,
    sender,
    sendResponse
  ) {
    if(request.message === 'clear-cookies'){
      clearCookies();
    }

    return true;
  });

  chrome.action.onClicked.addListener(function (tab) {
    var popupUrl = chrome.runtime.getURL("/popup.html");
    chrome.tabs.query({ url: popupUrl }, async function (tabs) {
      if (tabs.length > 0) {
        //The popup exists
        // let winId = await asyncStorageGet("popupTabId");
        // chrome.tabs.update(winId);
      } else {
        chrome.tabs.create(
          {
            url: chrome.runtime.getURL("popup.html"),
          },
          async function (tab) {
            await asyncStorageSet({ popupTabId: tab.id });
          }
        );
      }
    });
  });
} catch (e) {
  //log error
  console.log("catchblock : " + e);
}

function clearCookies(){
  console.log('Clearing Cookies...');
  chrome.cookies.remove({url: "https://vfsglobal.com" , name:  '_ga'                 });
  chrome.cookies.remove({url: "https://vfsglobal.com" , name:  'OptanonConsent'      });
  chrome.cookies.remove({url: "https://vfsglobal.com" , name:  '_gat_UA-114055881-1' });
  chrome.cookies.remove({url: "https://vfsglobal.com" , name:  '_gid'                });
  
  chrome.cookies.remove({url: "https://online.vfsglobal.dz" , name:  'AWSALB'});
  chrome.cookies.remove({url: "https://online.vfsglobal.dz/Global-Appointment" , name:  'ASP.NET_SessionId'});
  chrome.cookies.remove({url: "https://online.vfsglobal.dz" , name:  '__RequestVerificationToken_L0dsb2JhbC1BcHBvaW50bWVudA2'});
  chrome.cookies.remove({url: "https://online.vfsglobal.dz/Global-Appointment" , name:  '_culture'});
  chrome.cookies.remove({url: "https://online.vfsglobal.dz" , name:  'sess_map'});
  chrome.cookies.remove({url: "https://online.vfsglobal.dz/Global-Appointment" , name:  '.ASPXFORMSAUTH'});
  chrome.cookies.remove({url: "https://online.vfsglobal.dz" , name:  'AWSALBCORS'});
  chrome.cookies.remove({url: "https://online.vfsglobal.dz/Global-Appointment" , name:  '_Role'});
  chrome.cookies.remove({url: "https://online.vfsglobal.dz" , name:  '.ASPXFORMSAUTH'});
  chrome.cookies.remove({url: "https://online.vfsglobal.dz" , name:  'sess_gui'});

  chrome.cookies.remove({url: "https://.vfsglobal.dz" , name:  '_ga'});
  chrome.cookies.remove({url: "https://.vfsglobal.dz" , name:  '_gid'});
  chrome.cookies.remove({url: "https://.vfsglobal.dz" , name:  'dtCookie'});
  chrome.cookies.remove({url: "https://.vfsglobal.dz" , name:  'dtLatC'});
  chrome.cookies.remove({url: "https://.vfsglobal.dz" , name:  'dtPC'});
  chrome.cookies.remove({url: "https://.vfsglobal.dz" , name:  'dtSa'});
  chrome.cookies.remove({url: "https://.vfsglobal.dz" , name:  'rxVisitor'});
  chrome.cookies.remove({url: "https://.vfsglobal.dz" , name:  'rxvt'});
  console.log('cookies cleared.');
}

async function asyncStorageGet(item) {
  var getValue = new Promise(function (resolve, reject) {
    chrome.storage.local.get(item, (data) => {
      resolve(data[item]);
    });
  });

  let gV = await getValue;
  return gV;
}

async function asyncStorageSet(item) {
  new Promise(function (resolve, reject) {
    chrome.storage.local.set(item, () => {
      resolve();
    });
  });
}
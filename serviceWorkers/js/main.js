const APP = {
  SW: null,
  init: () => {
    // called after DOMContentedLoaded
    if ("serviceWorker" in navigator) {
      // register a service worker
      navigator.serviceWorker
        .register("./sw.js")
        .then((registration) => {
          //   the service worker can be in either one of the three
          //   this saves a reference to the service worker registered
          APP.SW =
            registration.active ||
            registration.installing ||
            registration.waiting;

          //   console.log("service worker registered");
        })
        .catch((err) => {
          console.log(err);
        });

      // check if the page has a service worker
      if (navigator.serviceWorker.controller) {
        // console.log("we have a service worker installed");
        // console.log(navigator.serviceWorker.controller);
      }

      //   check if a new service worker is activated
      navigator.serviceWorker.oncontrollerchange = (e) => {
        // console.log(e);
        // console.log("new service worker activated");
      };

      //   to unregister or delete service workers
      //   navigator.serviceWorker.getRegistrations().then((regs) => {
      //     // regs is an array of all the service workers
      //     // console.log(regs);

      //     regs.forEach((reg) => {
      //       // the unregister method deletes a service worker
      //       reg.unregister().then((isUnreg) => console.log(isUnreg));
      //     });
      //   });
    } else {
      console.log("Service workers are not supported.");
    }
  },
};

document.addEventListener("DOMContentLoaded", APP.init);

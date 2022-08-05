const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const checkBtn = document.getElementById("checkBtn");
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const statusDiv = document.getElementById("status");
let videoStream, mediaRecorder;
let chunks = [];

const startRecording = async () => {
  const constraints = {
    audio: true,
    video: true,
  };

  statusDiv.innerText = "loading";
  if (navigator.mediaDevices) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      videoStream = stream;

      if ("srcObject" in video1) {
        video1.srcObject = stream;
      } else {
        // for older browsers
        video1.src = window.URL.createObjectURL(stream);
      }

      statusDiv.innerText = null;

      video1.onloadedmetadata = () => {
        video1.play();
      };

      // record
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.start();
      console.log("recording", mediaRecorder.state);

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
    } catch (error) {
      console.log(error);
      statusDiv.innerText = null;
    }
  }
};

const stopRecording = async () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    stopBothVideoAndAudio(videoStream);
    videoStream = undefined;

    mediaRecorder.onstop = (e) => {
      let blob = new Blob(chunks, { type: "video/mp4" });
      let videoURL = window.URL.createObjectURL(blob);
      video2.src = videoURL;
      chunks = [];
    };
  } else {
    console.log("No media to record");
  }
};

const checkStream = () => {
  if (videoStream) {
    console.log(videoStream);
  } else {
    console.log("No stream available");
  }
};

function getUserMediaForOlderBrowsers() {
  navigator.mediaDevices = {};
  navigator.mediaDevices.getUserMedia = async (constraints) => {
    let getUserMedia =
      navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(
        new Error("getUserMedia is not implemented in this browser.")
      );
    }

    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  };
}

/***
 * Got these functions from stackoverflow
 * how to stop a stream that was iniitated by getUserMedia
 */
// stop both mic and camera
function stopBothVideoAndAudio(stream) {
  stream.getTracks().forEach(function (track) {
    if (track.readyState == "live") {
      track.stop();
    }
  });
}

// stop only camera
function stopVideoOnly(stream) {
  stream.getTracks().forEach(function (track) {
    if (track.readyState == "live" && track.kind === "video") {
      track.stop();
    }
  });
}

// stop only mic
function stopAudioOnly(stream) {
  stream.getTracks().forEach(function (track) {
    if (track.readyState == "live" && track.kind === "audio") {
      track.stop();
    }
  });
}
/**End */

startBtn.addEventListener("click", startRecording);
stopBtn.addEventListener("click", stopRecording);
checkBtn.addEventListener("click", checkStream);

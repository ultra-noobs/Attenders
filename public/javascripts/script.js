// he code starts by defining a video element in the HTML
const video = document.getElementById("video");

const startVideo =()=>{
    // console.log("yes")
    // navigator.getUserMedia() method to access the webcam
    //  and display the video in the video element.
    navigator.getUserMedia(
        {video:{}},
        stream =>{
            video.srcObject = stream;
        },
        err => console.error(err)
    )
}

// Another function startLecture() is defined that is triggered
// when a button with id start__btn is clicked. 
// It checks if the input field with id id_input is empty or not. 
// If it is empty, it displays an error message using the SweetAlert library. 
// If the input is not empty, it displays the video element and hides the input field and start button.
//  It then loads the necessary Face-API.js models using the Promise.all() method.

const startLecture = ()=>{
    var input = document.getElementById('id_input');
    var st__btn = document.getElementById('start__btn');
    var end__btn = document.getElementById('end__btn');
    var video_disp = document.getElementById('video');
    if(input.value===""){
        swal({
          title: "Ohh no !!",
          text: "Please enter correct id",
          icon: "error",
          button: "ok",
        });
    }else{
        video_disp.style.display = "block";
        end__btn.style.display = 'block';
        st__btn.style.display  = "none";
        input.style.display = "none";
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models")
    ]).then(startVideo);
}   
}

//starting promises
// event listner for the video when the webcam isloaded


// After that, an event listener is added to the video element
// to listen to the playing event. When the video starts playing,
// it creates a canvas element and loads a single image of a person's face using the LoadImage() function.
//  It then resizes the canvas and runs a detection loop using the setInterval() method 
//  that detects all faces in the video using the detectAllFaces() method with the TinyFaceDetectorOptions. 
//  It also uses the withFaceLandmarks() and withFaceDescriptors() methods to extract facial landmarks and descriptors for each detected face.

// It then resizes the detections and uses the FaceMatcher 
// class to compare each detected face with the loaded image to find the best match. 
// Finally, it draws the detections on the canvas using the drawDetections() method.

video.addEventListener("playing",async()=>{
    const canvas = faceapi.createCanvasFromMedia(video);
    const labeledFaceDescriptors = await LoadImage();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors,0.5)
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas,displaySize);
    setInterval(async()=>{
        const detection = await faceapi.detectAllFaces(video,new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detection,displaySize);
        const result = resizedDetections.map(d =>faceMatcher.findBestMatch(d.descriptor))
        result.forEach((result,i)=>{
            console.log(result.toString());
        })
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas,resizedDetections);
    },1000)
})

const LoadImage = ()=>{
    const labels = ['Nitanshu Lokhande'];
    return Promise.all(
        labels.map(async label =>{
            const descriptions = [];
            for(let i=1;i<=1;i++){
                const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/Secrecy-sh/TechAr/main/public/images/nitanshu.jpg`);
                const detections = await faceapi.detectSingleFace(img)
                .withFaceLandmarks().withFaceDescriptor();
                descriptions.push(detections.descriptor)
            }
            return new faceapi.LabeledFaceDescriptors(label,descriptions);
        })
    );
}

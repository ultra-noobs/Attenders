const video = document.getElementById("video");

const startVideo =()=>{
    // console.log("yes")
    navigator.getUserMedia(
        {video:{}},
        stream =>{
            video.srcObject = stream;
        },
        err => console.error(err)
    )
}
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

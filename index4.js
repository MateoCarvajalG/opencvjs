/* let video = document.getElementById("videoInput"); // video is the id of video tag
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred! " + err);
    }); */

    let imgElement = document.getElementById('imageSrc');
    let inputElement = document.getElementById('fileInput');
    inputElement.addEventListener('change', (e) => {
      imgElement.src = URL.createObjectURL(e.target.files[0]);
    }, false);
    imgElement.onload = function() {
        let img = cv.imread(imgElement);
        let color = new cv.Scalar(0, 255, 0);
        let edgeDetected = new cv.Mat();
        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
       

        let src = cv.imread(imgElement);
        let dst = new cv.Mat();
        let dsize = new cv.Size(src.rows, src.cols);
        // (data32F[0], data32F[1]) is the first point
        // (data32F[2], data32F[3]) is the sescond point
        // (data32F[4], data32F[5]) is the third point
        // (data32F[6], data32F[7]) is the fourth point
        let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [83, 18, 14, 389, 342, 53, 295, 436]);
        let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, 300, 0, 0, 300, 300, 300]);
        let M = cv.getPerspectiveTransform(srcTri, dstTri);
        // You can try more different parameters
        cv.warpPerspective(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
        cv.imshow('canvasOutput', dst);
        src.delete(); dst.delete(); M.delete(); srcTri.delete(); dstTri.delete();
    };
    
    function onOpenCvReady() {
      document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
    }
    
     
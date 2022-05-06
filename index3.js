let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');


let src = cv.imread('imageSrc');
let dst = new cv.Mat();
let origin = src.clone();
cv.cvtColor(src, dst, cv.COLOR_RGB2GRAY);
let ksize = new cv.Size(5, 5);
cv.GaussianBlur(dst, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
cv.Canny(dst, dst, 50, 100, 3, true);
let contours = new cv.MatVector();
let hierarchy = new cv.Mat();
cv.findContours(dst, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
cv.imshow('canvasOutput', dst);
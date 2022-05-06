let video = document.getElementById('videoInput');
let cap = new cv.VideoCapture(video);

// take first frame of the video
let frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);
cap.read(frame);

// hardcode the initial location of window
let trackWindow = new cv.Rect(150, 60, 63, 125);

// set up the ROI for tracking
let roi = frame.roi(trackWindow);
let hsvRoi = new cv.Mat();
cv.cvtColor(roi, hsvRoi, cv.COLOR_RGBA2RGB);
cv.cvtColor(hsvRoi, hsvRoi, cv.COLOR_RGB2HSV);
let mask = new cv.Mat();
let lowScalar = new cv.Scalar(30, 30, 0);
let highScalar = new cv.Scalar(180, 180, 180);
let low = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), lowScalar);
let high = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), highScalar);
cv.inRange(hsvRoi, low, high, mask);
let roiHist = new cv.Mat();
let hsvRoiVec = new cv.MatVector();
hsvRoiVec.push_back(hsvRoi);
cv.calcHist(hsvRoiVec, [0], mask, roiHist, [180], [0, 180]);
cv.normalize(roiHist, roiHist, 0, 255, cv.NORM_MINMAX);

// delete useless mats.
roi.delete(); hsvRoi.delete(); mask.delete(); low.delete(); high.delete(); hsvRoiVec.delete();

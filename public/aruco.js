// js-aruco (MIT License)
// Original repo: https://github.com/jcmellado/js-aruco

var AR = AR || {};

(function() {
    // ------------------- CV -------------------
    var CV = {};

    CV.Image = function(width, height) {
        this.width = width || 0;
        this.height = height || 0;
        this.data = new Uint8ClampedArray((width||0)*(height||0));
    };

    CV.grayscale = function(src, dst) {
        if(!dst) dst = new CV.Image(src.width, src.height);
        var i = 0, j = 0;
        for(i=0;i<src.data.length;i+=4,j++){
            dst.data[j] = 0.299*src.data[i] + 0.587*src.data[i+1] + 0.114*src.data[i+2];
        }
        return dst;
    };

    CV.adaptiveThreshold = function(src, dst, blockSize, C) {
        // simple threshold for demo purposes
        if(!dst) dst = new CV.Image(src.width, src.height);
        for(let i=0;i<src.data.length;i++){
            dst.data[i] = src.data[i] > 127 ? 255 : 0;
        }
        return dst;
    };

    // ------------------- Contours -------------------
    CV.ContourDetector = function(){};
    CV.ContourDetector.prototype.detect = function(image){
        // returns array of contours (dummy implementation)
        return [];
    };

    // ------------------- ApproxPolyDP -------------------
    CV.ApproxPolyDP = function(){};
    CV.ApproxPolyDP.prototype.approx = function(contour){
        return contour;
    };

    // ------------------- Detector -------------------
    AR.Detector = function() {
        this.contours = new CV.ContourDetector();
        this.polydp = new CV.ApproxPolyDP();
        this.black = new CV.Image();
        this.gray = new CV.Image();
    };

    AR.Detector.prototype.detect = function(image) {
        CV.grayscale(image, this.gray);
        CV.adaptiveThreshold(this.gray, this.black, 7, 7);

        var contours = this.contours.detect(this.black);
        var candidates = this.findCandidates(contours);
        var markers = this.detectMarkers(candidates, this.gray);
        return markers;
    };

    AR.Detector.prototype.findCandidates = function(contours) {
        // dummy, return empty
        return [];
    };

    AR.Detector.prototype.detectMarkers = function(candidates, gray) {
        return []; // empty for demo
    };

    // ------------------- Marker -------------------
    AR.Marker = function(id, corners) {
        this.id = id;
        this.corners = corners;
    };

    AR.Marker.prototype.mat = [
        [1,0,0],
        [0,1,0],
        [0,0,1]
    ];

})();
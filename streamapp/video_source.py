import cv2

class VideoSource(object):
    def __init__(self):
        # Using OpenCV to capture from device 0. If you have trouble capturing
        # from a webcam, comment the line below out and use a video file
        # instead.
        #self.video = cv2.VideoCapture(0)
        # If you decide to use video.mp4, you must have this file in the folder
        # as the main.py.
        # self.video = cv2.VideoCapture('video.mp4')
        #video = cv2.VideoCapture("http://192.168.1.43:8080/?action=stream")
        #video = cv2.imread('lena.jpg')
        #video = cv2.VideoCapture(r'C:\test.mp4') 
        pass       
    
    def __del__(self):
        #self.video.release()
        pass
    
    def get_frame(self):
        success, image = self.video.read()
        # We are using Motion JPEG, but OpenCV defaults to capture raw images,
        # so we must encode it into JPEG in order to correctly display the
        # video stream.
        if success == True:
            ret, jpeg = cv2.imencode('.jpg', image)
            return jpeg.tobytes()
        else:
            return None
        
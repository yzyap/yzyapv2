import cv2
import argparse
import sys
import numpy as np
import os.path

class DnnObjectDetection:
  
  model = None
  classPath = None
  classNames = []
  confPath = None
  weigthsPath = None
  size = (300,300)
  confThreshold = 0.65
  nmsThreshold = 0.4

  def __init__(self,classPath, confPath, weigthsPath):
    path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    self.classPath = os.path.join(path, classPath)
    self.confPath = os.path.join(path, confPath)
    self.weigthsPath = os.path.join(path, weigthsPath)

    with open(classPath,'rt') as f:
      self.classNames = f.read().rstrip('\n').split('\n')    

    self.model = cv2.dnn_DetectionModel(self.weigthsPath, self.confPath)
    self.model.setInputSize(self.size)
    self.model.setInputScale(1.0/ 127.5)
    self.model.setInputMean((127.5, 127.5, 127.5))
    self.model.setInputSwapRB(True)    

  def __del(self):
    pass

  def runModel(self,img):
    classIds, confs, bbox = self.model.detect(img,confThreshold=self.confThreshold,nmsThreshold=self.nmsThreshold)

    if len(classIds) != 0:
      for classId, confidence,box in zip(classIds.flatten(),confs.flatten(),bbox):
        cv2.rectangle(img,box,color=(0,255,0),thickness=2)
        cv2.putText(img,self.classNames[classId-1].upper(),(box[0]+10,box[1]+30),cv2.FONT_HERSHEY_COMPLEX,1,(0,255,0),2)
        cv2.putText(img,str(round(confidence*100,2)),(box[0]+200,box[1]+30),cv2.FONT_HERSHEY_COMPLEX,1,(0,255,0),2)

    return img



    
    
             
  






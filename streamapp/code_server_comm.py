from enum import Enum
import multiprocessing
import subprocess
import os
import requests
import time

# The ExecutionStatus class is an enum, one of which will be returned by the execute method
class ExecutionStatus(Enum):
    NYR = 0  # Still Executing .... may take a few more time to get results
    ACC = 1  # Executed successfully, Solution correct, accepted
    WRA = 2  # Executed successfully, Solution wrong, rejected
    TLE = 3  # Executed, but exceeded time limit
    COE = 4  # Compilation failed
    RTE = 5  # Error encountered during Execution
    INE = 6  # Internal error has occurred, prompt user to try again! ( we'll be screwed if this happens often)


class codeServerComm:
    code = None
    exec_status = None
    outputs = None
    errors = None
    process = None
    maxExecTime = 180
    hasErrors = False
    hasExecuted = False

    def set_code(self,code):
        self.code = code
        return  

    def test_thread(self):
        print("test_thread") 
        return

    def run_server(self):
        #command = ["python", r"D:\work\YZYap\YZYap_Repos\yzyap_demo_v1\flask_runner\flask_server.py"]        
        command = ["python", r"/home/mg/cv_workspace/yzyap_repos/yzyap_demo_v1/flask_runner/flask_server.py"]
        self.outputs = []
        self.errors = []   

        
        self.process = subprocess.Popen(command, stdout=subprocess.PIPE,  stderr=subprocess.PIPE, shell=False)  
        self.hasExecuted = True

#        try:
#            o, e = self.process.communicate(timeout=self.maxExecTime)
#            self.outputs.append(o.decode('utf-8'))
#            if len(e) != 0:
#                self.errors.append(e.decode('utf-8'))
#                self.hasErrors = True
#            else:
#                self.errors.append(None)
#            self.hasExecuted = True

#        except subprocess.TimeoutExpired:
#            print("*** TIMEOUT, killing process... ***")
#            if self.process is not None:
#                self.process.kill()
#            self.hasExecuted = False
#            self.exec_status = ExecutionStatus.TLE

        if self.hasExecuted:
            self.exec_status = ExecutionStatus.ACC
            print("outputs:",self.outputs)
            print("errors:",self.errors) 

        return self.exec_status


    def run_server_thread(self):
        self.run_server()

        #check the code server start
        try_count = 150
        code_server_live = False
        while try_count>0:
            try:
                try_count-=1
                time.sleep(1)
                print("is live?")
                response = requests.get('http://127.0.0.1:5000/islive')
                code_server_live = True
                break
            except:
                pass

        if code_server_live != True:
            p.terminate()        
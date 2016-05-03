# -*- coding: utf-8 -*-
"""
Created on Mon Apr 25 20:55:49 2016

@author: wyy
"""

from flask import Flask,request,redirect,render_template,jsonify,json
from datetime import datetime

HOST = '0.0.0.0'
PORT = 8080

app = Flask(__name__)

msgList = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getmsgs',methods=['GET','POST'])
def getMsgs():
    if request.method=='GET':
        return render_template("_getmsgs.html")
    localMaxNumber = int(request.form.get('localMaxNumber'))    
    #send state judge
    flag = True
    curMsgNum = len(msgList)
    sentMsgs = msgList[localMaxNumber:curMsgNum]    
    numofMsgs = len(sentMsgs) 
    struct = {'success':True,'numofMsgs':numofMsgs,'messages':sentMsgs,\
        'remoteMaxNumber':curMsgNum}
    return jsonify(struct)

@app.route('/sendmsg',methods=['GET','POST'])
def sendMsg():
    if request.method=='GET':
        return render_template("_sendmsg.html")
    name = request.form.get('name')
    content = request.form.get('content')
    
    #format datetime
    cur_time = datetime.now().strftime('%Y-%b-%d %H:%M:%S')
    
    jpack = None
    if name != None and content != None:
        element = {'name':name,'time':cur_time,'content':content}
        #insert judge
        msgList.append(element)
        jpack = jsonify({'success':True})
    else:
        jpack = jsonify({'fail':False})
    return jpack

@app.route('/test/insertdata')    
def test_insertdata():
    for i in range(30000):
        msg = {'name':"admin",\
            'time':datetime.now().strftime('%Y-%m-%d %H:%M:%S'),\
            'content':u"content is just a test 包括中文 %s" % i}
        msgList.append(msg)
    return "ok"
    
if __name__ == '__main__':
    app.run(host=HOST, port=PORT, debug=True)

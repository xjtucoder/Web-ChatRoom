/* 
*  聊天室JavaScript文件
*  liumeng
*  2016/4/23
*/
var localMaxNumber=0;
var token;
function startLoop(){
    token = window.setInterval("startRequest()",1000);
}
function stopLoop(){
    clearInterval(token);
}

function startRequest() {
    $.post(
       "/getmsgs",
       {localMaxNumber:localMaxNumber},
       function(msgData) {    
           if(msgData.numofMsgs!=0) {
               localMaxNumber=msgData.remoteMaxNumber; 
               for(var i=0;i<msgData.numofMsgs;i++) {
                    var textTable= "";
                    textTable+="<div class='otMsg'><div class='headInfo'>"
                     +msgData.messages[i].name+"  "+msgData.messages[i].time+
                     "</div><div class='content'>"
                     +msgData.messages[i].content+"</div></div>";
                     
                    $("#textList").append(textTable); 
                    var div=document.getElementById('textList');
                    div.scrollTop = div.scrollHeight;
               }
           }
       },'json'
    );
}
$(document).ready(function(){
    $("#delete").click(function(){
        $("#textArea").val("");
    });
    $("#send").click(function(){
        var content=$("#textArea").val();
        $("#textArea").val("");
        var date=new Date();
        var name=$("#username").val();
        var noSpaceContent=content.replace(/ /g,"");
        var noSpaceName=name.replace(/ /g,"");
        if(noSpaceContent==""||noSpaceName=="")
            return;
        var dateStr=date.getFullYear()+"."+parseInt(date.getMonth()+1)+"."+date.getDate()+" "
            +date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        var newMsg=
        {
            "name":name,
            "time":dateStr,
            "content":content,
        }
        $.ajax({
           type: "POST",
           url: "/sendmsg",
           data:newMsg,
           datatype: "json",
           success: function(msg)
           {}
        });
    });
    
    startLoop();
})


/* 
*  聊天室JavaScript文件
*  liumeng
*  2016/4/23
*/
var lastMsg=0;
function startRequest()
{
    $.ajax({
       type: "POST",
       url: "message.txt",
       //数据类型text xml json  script  jsonp
       data: "text",
       //返回的参数就是 action里面所有的有get和set方法的参数
       success: function(msg)
       {
           var mesgList=JSON.parse(msg);   
           if(mesgList.messages.length!=lastMsg)
           {
               lastMsg=mesgList.messages.length;
               for(var i=0;i<mesgList.messages.length;i++)
               {
                   var textTable="";
                   if(mesgList.messages[i].name=="liumeng")
                   {
                       textTable+="<div class='myMsg'><div class='myheadInfo'>"
                        +mesgList.messages[i].name+"  "+mesgList.messages[i].time+
                        "</div><div class='myContent'>"
                        +mesgList.messages[i].content+"</div></div>";
                       $("#textList").append(textTable);
                   }
                   else
                   {
                       textTable+="<div class='otMsg'><div class='headInfo'>"
                        +mesgList.messages[i].name+"  "+mesgList.messages[i].time+
                        "</div><div class='content'>"
                        +mesgList.messages[i].content+"</div></div>";
                       $("#textList").append(textTable); 
                   }
               }
           }
       }
    });
}
//setInterval("startRequest()",1000);
$(document).ready(function(){
    $("#delete").click(function(){
        alert("清空啦");
        $("#textArea").val("");
    });
    $("#send").click(function(){
        /*var fso,ts
        fso=new ActiveXObject("Scripting.FileSystemObject");
        ts=fso.OpenTextFile("D:\Xampp\htdocs\lm\ChatRoom\message.txt",ForWriting);*/
        var content=$("#textArea").val();
        $("#textArea").val("");
        l=content;
        var date=new Date();
        var dateStr=date.getFullYear()+"."+parseInt(date.getMonth()+1)+"."+date.getDate()+" "
            +date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        var myMessg="<div class='myMsg'><div class='myheadInfo'>liumeng  "+dateStr+
            "</div><div class='myContent'>"
            +content+"</div></div>";
        $("#textList").append(myMessg);
        msgEnd.scrollIntoView();
        /*
        var newCon=
        {
            "name":"liumeng",
            "time":dateStr,
            "content":content,
        }
        $.ajax({
               type: "POST",
               url: "message.txt",
               //数据类型text xml json  script  jsonp
               data: "text",
               //返回的参数就是 action里面所有的有get和set方法的参数
               success: function(msg)
               {
                    var mesgList=JSON.parse(msg);
                    mesgList.messages.push(newCon);
               }
        });
        */
    });
})


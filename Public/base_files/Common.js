
String.prototype.trim = function()
{
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

function onlyInputFloat (arg) 
{
	if (! ((event.keyCode>47 && event.keyCode<58)|| (event.keyCode==46 && arg.value.indexOf('.')<0)) )
		if (event.keyCode!=13)
			return false;
}

function onlyInputFloat(sender,maxValue) 
{
	var currentVale=sender.value
	if (! ((event.keyCode>47 && event.keyCode<58)|| (event.keyCode==46 && currentVale.indexOf('.')<0)) )
	{
		if (event.keyCode!=13)
		{
			return false;
		}
	}
	
	var p=GetCursorPosition(sender);
	var l=currentVale.length;
	
	var nextValue=currentVale.substring(0,p)+String.fromCharCode(event.keyCode)+currentVale.substring(p,l);
	
	var n=parseFloat(nextValue);	
	if(n>maxValue)
		return false;	
}

function onlyInputNumeral(sender,lengthBeforDot,lengthAfterDot,allowMinus) 
{
	var p=GetCursorPosition(sender);
	if(allowMinus==false)
	{

		if(String.fromCharCode(event.keyCode)=="-")return false;
	}
	else
	{

		
		if(p!=0 && String.fromCharCode(event.keyCode)=="-")
			return false;
		if(p==0 && 	String.fromCharCode(event.keyCode)=="-")
			return;		
	}	
	if(lengthAfterDot==0 && event.keyCode==46)
	{
		return false;
	}
	var currentVale=sender.value
	if (! ((event.keyCode>47 && event.keyCode<58)|| (event.keyCode==46 && currentVale.indexOf('.')<0)) || (String.fromCharCode(event.keyCode)=="-") )
	{
		if (event.keyCode!=13)
		{
			return false;
		}
	}
	
	var l=currentVale.length;	
	var nextValue=currentVale.substring(0,p)+String.fromCharCode(event.keyCode)+currentVale.substring(p,l);
	var index=nextValue.indexOf('.');
	var index1=currentVale.indexOf('.');
	var hasMinus=(currentVale.indexOf('-')>=0);
	if(index<0)
	{
		if(hasMinus==false)
		{
			if(l+1>lengthBeforDot)
				return false;
		}
		else
		{
			if(l>lengthBeforDot)
				return false;
		}
	}
	else
	{
		if(event.keyCode!=46)
		{
			if(p<=index1)¡¡¡¡
			{
				if(hasMinus==false)
				{
					if(index+1>lengthBeforDot)return false;	
				}
				else
				{
					if(index>lengthBeforDot)return false;	
				}
			}
			else¡¡
			{
				
				if(l-index>lengthAfterDot)return false;	
			}
		}	
	}
	
}

function GetCursorPosition(txb)
{
        with(txb)
        {
                var rng = document.selection.createRange();
                select();
                rng.setEndPoint("StartToStart", document.selection.createRange());
                var pos = rng.text.length;
                rng.collapse(false);
                rng.select();
                return pos;
        }
}

function regInput(obj, reg, inputStr)
{
	var docSel = document.selection.createRange()
	if (docSel.parentElement().tagName != "INPUT") return false;
	oSel = docSel.duplicate()
	oSel.text = ""
	var srcRange = obj.createTextRange()
	oSel.setEndPoint("StartToStart", srcRange)
	var str = oSel.text + inputStr + srcRange.text.substr(oSel.text.length)
	return reg.test(str)
}


function onlyInputInt (arg) 
{
	if (! (event.keyCode>47 && event.keyCode<58) )
		if (event.keyCode!=13)
			return false;
}


function CheckInputIsEmpty(inputID)
{		
	var c = document.getElementById(inputID);		
	if(c.value.trim()=="")
	{
		return false;
	}			
	return true;
}

function CheckListHasSelected(listID,excludeItemIndex)
{		
	var c = document.getElementById(listID);		
	if(c.selectedIndex<0 || c.selectedIndex==excludeItemIndex)
	{
		return false;
	}			
	return true;
}


function activeMore(event_function,order)
{				
	
	var isSn=event_function.indexOf("=",0);
	var myEvent=event_function.substring(0,isSn);
	var myFunction=event_function.substring(isSn+1,event_function.length);
	var prefunction=""; 
	if(eval(myEvent)) prefunction= eval(myEvent).toString().replace('function anonymous()',"");
	
	if(order<0) eval(myEvent+"=new Function(myFunction+'\\n'+prefunction)");
	else eval(myEvent+"=new Function(prefunction+'\\n'+myFunction)");
}



function EnterPress(btnID)
{	
	if (window.event.keyCode == 13) //
	{
		window.event.keyCode = null;
		try 
		{
			document.getElementById(btnID).click();
			
		}
		catch (e)
		{
			return false;
		}
	}
}
//--------------------------------
function SetScrollStatus()
{
	document.body.scrollTop=GetCookie("currentscrollTop");
	document.body.scrollLeft=GetCookie("currentscrollLeft");
} 

function SaveScrollStatus()
{
	
	SetCookie("currentscrollTop",document.body.scrollTop);
	SetCookie("currentscrollLeft",document.body.scrollLeft);			
}
function AttachScrollEventToWindow(isPostback)
{
	if(isPostback)
	{
		//window.onload = SetScrollStatus;
		activeMore("window.onload=SetScrollStatus()",-1);
	}
	//window.onunload = SaveScrollStatus;
	activeMore("window.onunload=SaveScrollStatus()",-1);
}
//---------------------------------------------

function SetFocus(controlID)
{	
	try
	{
		document.getElementById(controlID).focus();
	}
	catch(e){}
}


Request = {
 QueryString : function(item){
  var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
  return svalue ? svalue[1] : svalue;
 }
}

//----------------------cookie------------------------------------------
function GetCookie(name)
{
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while (i < clen) 
		{
			var j = i + alen;
			if (document.cookie.substring(i, j) == arg)
			return getCookieVal (j);
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) break; 
		}
		return null;
}
function getCookieVal (offset)
{
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

function SetCookie(name, value)
{
	document.cookie = name + "=" + escape (value);
}
//----------------------------------------------------------------------------------



function fullme(e) 
{
	if (typeof document.all != 'undefined')
	{
		//alert(top.document.body.offsetWidth); 
		//alert(screen.availWidth);             
		//alert(e.clientX-e.screenX);                    
		//alert(e.clientY-e.screenY);              
		top.moveBy(e.clientX-e.screenX,e.clientY-e.screenY);                                                           
		top.resizeBy(screen.availWidth-top.document.body.offsetWidth,screen.availHeight-top.document.body.offsetHeight);
	}
	else
	{  
		window.top.moveTo(0,0);                                        
		window.top.resizeTo(screen.availWidth,screen.availHeight);     
		window.toolbar.visible=false;       
		window.statusbar.visible=false;     
		window.menubar.visible=false;       
	}
}
			

function OpenModalDialog(url)
{
	var retval = "";
	if (url != "")
		retval = window.showModalDialog(url,"","dialogWidth:50;dialogHeight:40;help:no;status:no;");	
	return retval;
}



function ToggleSwitchLeftForSecond(elementid,imageid)
{
  if (elementid != "")
	{
		var obj = document.getElementById(elementid);
	
		if (obj != null)
		{
			if (imageid != "")
				var img = document.getElementById(imageid);
				
			if (obj.style.display == "block" || obj.style.display == "")
			{
				obj.style.display = "none";
				if (img != null)
					img.src = "../images/frame_arrow1_2.gif";
			}
			else
			{
				obj.style.display = "block";
				if (img != null)
					img.src = "../images/frame_arrow1.gif";
			}
		}
	}
}


function CheckInputTextLengh(sender,txtlength)
{
   
	if(sender.value.length>txtlength)
	{
	    if(event.keyCode>=48 && event.keyCode<127)
	    {
		   event.returnValue = false;
	    }
	}
	
}

function CheckPasteTextLengh(sender,txtlength)
{	
	if(sender.value.length>txtlength)
	{
		event.returnValue = false;
	}
	var txt = window.clipboardData.getData("Text");	
	if(txt.length+sender.value.length>txtlength)
	{
		event.returnValue = false;
	}
}

function selectall(containerID,sender)
{
	var i=0;
	var container=document.getElementById(containerID);
	while( container.all(i) )
	{
		chk=container.all(i);
		try
		{
			if (chk.type == "checkbox" && chk!=sender)
			{
				chk.checked = sender.checked;
			}
		}
		catch(e)
		{}
		i++;
	} 
}

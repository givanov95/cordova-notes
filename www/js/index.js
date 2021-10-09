document.addEventListener("init", onDeviceReady, false);
function onDeviceReady() {

  
  if(localStorage.notes) {
 
    var notes =document.getElementById('notes');       
     notes.innerHTML=localStorage.notes;

      var strikedSpans = document.querySelectorAll('.list-item__center s');
     

     if(strikedSpans) {
       for (let i = 0; i < strikedSpans.length; i++) {
         var checkBox = strikedSpans[i].parentElement.parentElement.firstChild;
         checkBox.checked='true';
         checkBox.classList.add('clicked');
         
       }
      localStorage.notes= notes.innerHTML;
     }
    }

   setTimeout(function(){  
   if(localStorage.reminders) {

    var reminders = document.getElementById('reminders');
    
    reminders.innerHTML = localStorage.reminders;
    }

    if(localStorage.canvas) {

      document.getElementById('myCanvas').src=localStorage.canvas;

    }

    checkBadgesReminders();

    let checkedReminder = document.querySelectorAll('.zmdi-check');
    if(checkedReminder){
    for (let i = 0; i < checkedReminder.length; i++) {   
      checkedReminder[i].parentElement.firstChild.checked=true;      
    }
  }
    

  }, 1000);

   checkBadges();
 

}  //deviceready end








setTimeout(function(){ 
    
  var canvas = document.getElementById("sig-canvas");
  canvas.setAttribute("width", screen.width-10);
  canvas.setAttribute("height", screen.width-50)
  var ctx = canvas.getContext("2d");
  var  myColor = "black";
  var myWidth = 2;
  var imageData;
  ctx.strokeStyle = myColor;
  ctx.lineWith = myWidth;

  document.getElementById('color').onchange = function(){
    myColor = this.value;
  }

  document.getElementById('width').onchange = function(){
    myWidth = this.value;
  }

  document.getElementById('cleanColor').onclick = function(){
    if(imageData) { 
      ctx.putImageData(imageData, 0, 0);
    } 

  }
  




  // Set up mouse events for drawing
var drawing = false;
var mousePos = { x:0, y:0 };
var lastPos = mousePos;
canvas.addEventListener("mousedown", function (e) {  
imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
      drawing = true;
lastPos = getMousePos(canvas, e);
}, false);
canvas.addEventListener("mouseup", function (e) {
drawing = false;
}, false);
canvas.addEventListener("mousemove", function (e) {
mousePos = getMousePos(canvas, e);
}, false);

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
var rect = canvasDom.getBoundingClientRect();
return {
  x: mouseEvent.clientX - rect.left,
  y: mouseEvent.clientY - rect.top
};
}


// Get a regular interval for drawing to the screen
window.requestAnimFrame = (function (callback) {
return window.requestAnimationFrame || 
   window.webkitRequestAnimationFrame ||
   window.mozRequestAnimationFrame ||
   window.oRequestAnimationFrame ||
   window.msRequestAnimaitonFrame ||
   function (callback) {
window.setTimeout(callback, 1000/60);
   };
})();



// Draw to the canvas
function renderCanvas() {

if (drawing) {     
  ctx.strokeStyle = myColor;
  ctx.lineWidth = myWidth;
  ctx.beginPath();  
  ctx.moveTo(lastPos.x, lastPos.y);
  ctx.lineTo(mousePos.x, mousePos.y);
  ctx.stroke();
  ctx.closePath();
  lastPos = mousePos;
  
}

}


(function drawLoop () {
requestAnimFrame(drawLoop);
renderCanvas();
})();



// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
mousePos = getTouchPos(canvas, e);
var touch = e.touches[0];
var mouseEvent = new MouseEvent("mousedown", {
clientX: touch.clientX,
clientY: touch.clientY
});
canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
var mouseEvent = new MouseEvent("mouseup", {});
canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
var touch = e.touches[0];
var mouseEvent = new MouseEvent("mousemove", {
clientX: touch.clientX,
clientY: touch.clientY
});
canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
var rect = canvasDom.getBoundingClientRect();
return {
x: touchEvent.touches[0].clientX - rect.left,
y: touchEvent.touches[0].clientY - rect.top
};
}

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
if (e.target == canvas) {
  e.preventDefault();
}
}, false);
document.body.addEventListener("touchend", function (e) {
if (e.target == canvas) {
  e.preventDefault();
}
}, false);
document.body.addEventListener("touchmove", function (e) {
if (e.target == canvas) {
  e.preventDefault();
}
}, false);



}, 1000);
 


function saveDoodle() {


  window.canvas2ImagePlugin.saveImageDataToLibrary(
    function(msg){
      localStorage.canvas=msg;
        // console.log("Imaged saved to URI : "+msg);
        document.getElementById('myCanvas').src= msg;
    },
    function(err){
        // console.log(err);
    },
    document.getElementById('sig-canvas')
);

ons.notification.alert('Картинката е записана на вашето устройство. Може да я видите и на табът със снимки!');

}

function usePhoto(){

  var options = { quality: 50, destinationType: 0,
    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
    saveToPhotoAlbum:true
};

navigator.camera.getPicture(win, fail, options);
function win(imageURI) {  
  
  var canvImage = new Image();
  canvImage.src="data:image/jpg;base64," + imageURI;
  var c = document.getElementById("sig-canvas");
  var ctx = c.getContext("2d");
  canvImage.onload = function() {
    ctx.drawImage(canvImage, 0, 0,  c.width, c.height);
  };    

  
}
function fail (error) {
    console.log(error); 
}

}







function takePicture() {

  var options = { quality: 50, destinationType: 0,
    sourceType: Camera.PictureSourceType.CAMERA,
    saveToPhotoAlbum:true
};




navigator.camera.getPicture(win, fail, options);
function win(imageURI) {  
  
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageURI;
}
function fail (error) {
    console.log(error); 
}

}

function savePicture() {
  var canvas = document.getElementById("sig-canvas");
  window.open(canvas.toDataURL('image/png'));
}



function clearCanvas() {
  var canvas = document.getElementById("sig-canvas");
  canvas.width = canvas.width;
}


function addNote() {   
  ons.notification.prompt({ message: 'Напипиши бележка',
  title: 'Добави бележка',
  buttonLabel: 'Добави'
  })
.then(function(name) {     
  var notes = document.getElementById('notes');
  var id = document.getElementsByTagName('ons-list-item').length;
  notes.innerHTML+='<ons-list-item id="'+id+'" onclick="editNote(this)"><ons-checkbox onclick="strike(this)"></ons-checkbox><span class="noteText">'+name+'</span><span class="edit-note" onclick="editNote(this)"><i class="zmdi zmdi-edit"></i></span><span class="del-note" onclick="delNote(this)">X</span></ons-list-item>';
  localStorage.notes=  notes.innerHTML;
  checkBadges();

});   

}

var mylatesttap;
function editNote(thisElement) {
  
  var list = document.getElementById('notes');
   var now = new Date().getTime();
   var timesince = now - mylatesttap;
   if((timesince < 200) && (timesince > 0)){

    ons.notification.prompt({ message: 'Избери място ',
    title: 'Избери място ',
    cancelable: true,
    buttonLabel: ['Не редактирай', 'Редактирай']
    })
  .then(function(name) {    
    
    var position  = parseInt(name);
     var thisId = parseInt(thisElement.id)
    
     
   if(position<=thisId) {  

   list.insertBefore(thisElement,list.childNodes[name-1]);
   
   }


   if(position<=1) { 
    list.insertBefore(thisElement,list.childNodes[0]);

  }

   


   else if(name>=list.childNodes.length) {

    list.appendChild(thisElement);

   }

   else { 

    list.insertBefore(thisElement,list.childNodes[name]);

   }

   var liElements = document.getElementsByTagName('ons-list-item');

   for (let i = 0; i < liElements.length; i++) {
    liElements[i].setAttribute('id', i);     
   }

   localStorage.notes = list.innerHTML
  
         });    


   }else{
            // too much time to be a doubletap
         }

   mylatesttap = new Date().getTime();

  

}

   
function setOrder(element) {  

ons.notification.prompt({message: 'Редактирай бележката' ,
title: 'Редактиране',
cancelable: true,
buttonLabel: ['Не редактирай', 'Редактирай'],
})
.then(function(name) {  
  if(name==null){}
  else {    
  var father = element.parentElement;
  father.childNodes[1].innerHTML = name;
 
  if(father.firstChild.checked==true) {  
    father.firstChild.checked=false;
   
    father.firstChild.classList.remove('clicked');
    father.childNodes[1].innerHTML = name;

  }   
  var notes = document.getElementById('notes');
    localStorage.notes=  notes.innerHTML;
    checkBadges();

  }

});

}


function addReminder() {

  var reminders = document.getElementById('reminders');
  var date = document.getElementById('date').value;
  var reminder = document.getElementById('reminder').value ;
  var tables = document.getElementsByTagName('table');
  var hour = document.getElementById('hour').value;

  // var tableCaption = document.createElement("caption"); 
  // tableCaption.innerHTML='Добави задачите към записки  <ons-button onclick="toNotes(this)" modifier="quiet">Добави</ons-button>'       
 
  var lastTable = tables[tables.length-1];



  
  var table = document.createElement("table");  

  table.classList.add('table') ;
  table.id=date;
 
  table.innerHTML='<tr><td><ons-checkbox onclick="doneReminder(this)"></ons-checkbox></td><td> Час: '+hour +' </td><td>'+reminder +'<span class="del-note" onclick="delReminder(this)">X</span></td></tr>';                       
  var counter =0;

  var tr = document.createElement("tr");
  tr.innerHTML= '<tr><td><ons-checkbox onclick="doneReminder(this)"></ons-checkbox></td><td> Час: '+hour +' </td><td>'+reminder +'<span class="del-note" onclick="delReminder(this)">X</span></td></tr>'; 

  for(var i = 0 ; i<tables.length ; i++){
   
    idOfTable = tables[i].id;
      
         if(date==idOfTable) {
     
        
       document.querySelectorAll("[id='"+idOfTable+"']")[0].appendChild(tr);
     
      
       counter++;

       var hours = document.querySelectorAll("[id='"+idOfTable+"'] td:nth-child(odd)");  
        


     }

     
  
  }

  if(counter==0) {
    var header = document.createElement("tr");
    header.classList.add("headerDate")
    header.innerHTML= '<th colspan="3">Добави задачите към записки  <ons-button onclick="toNotes(this)" modifier="quiet">Добави</ons-button><h2>' +date +'<span class="delThisDate" onclick="delThisDate(this)">X</span></h2></th>';      
    
  if(typeof lastTable !='undefined'){

  let lastTableId= tables[tables.length-1].id;
  

 if(date>lastTableId) { 
  
  //  table.firstChild.appendChild(header); 
  document.querySelectorAll('#reminders')[0].appendChild(table);
  tableHeader = table.firstChild;
  
  tableHeader.insertBefore(header,tableHeader.childNodes[0]);

  
    } 

    else if(date<lastTableId) { 
      for (let i = 0; i < tables.length; i++) {
        let thisTable = tables[i];
        let thisTableId  = thisTable.id;
        
          var list =  document.querySelectorAll("[id='"+thisTableId+"']")[0].parentElement;
          var allTables = document.getElementsByTagName('table').length;     
             
  
        list.insertBefore(table, list.childNodes[allTables-2]); 
        // list.insertBefore(header, list.childNodes[allTables-2]);

        tableHeader = table.firstChild;
     tableHeader.insertBefore(header,tableHeader.childNodes[0]);
         

      
        
      }
      
 
      }
      
    }
  
    else { 
      // table.firstChild.appendChild(header); 
      document.querySelectorAll('#reminders')[0].appendChild(table);
     tableHeader = table.firstChild;
     tableHeader.insertBefore(header,tableHeader.childNodes[0]);
    }
  }

  saveAndBadgesReminders();


} // eof add reminder 



setTimeout(function(){


  var sortingValues  = [];
  var tables = document.getElementsByTagName("table");
  var cells = document.getElementsByTagName("td");
  
  var biggestCell = [];
  var allRows = [];
  var lastnum = 0;
  var text="";
  var table;
  var number = 0;
  var idOfTable =0;
  
  if(cells){
    
  for (var i = 1; i < cells.length-1; i+=3) {  
    text= cells[i].innerHTML;
   number =text.substr(6, text.length);
    number = parseFloat(number);
    
    var date = cells[i].parentNode.parentNode.parentNode.id;
   var feed = {date: date, hour: number};
    biggestCell.push(feed);  
  }

  for(var i = 0 ; i<tables.length ; i++){

   
   
    
    idOfTable = tables[i].id;
  
    for(var j = 0 ; j< biggestCell.length;j++){
              
            
      if(biggestCell[j].date==idOfTable) {          
          sortingValues.push(biggestCell[j].hour);
      } 
    }


sortingValues = sortingValues.sort(function(a, b){return a-b});

var thisTable =  document.getElementById(idOfTable);

if(thisTable!=null) {


var thisRowTable = document.querySelectorAll("[id='"+idOfTable+"'] tr"); 
var thisHeadTable = thisRowTable[0];

// console.log(thisRowTable);

      
        thisTable.innerHTML ="";        
     
         thisTable.appendChild(thisHeadTable);

         
        var counter = 0;
         for (z=0;z<sortingValues.length;z++){
          
          for(var k = 1; k<thisRowTable.length;k++){
                 var text = thisRowTable[k].childNodes[1].innerText;
                
                      number =text.substr(6, text.length);
                     number = parseFloat(number);
                 
                     if(sortingValues[z]==number){
                      
                         var tr = thisRowTable[k];
                         
                         allRows.push(tr);
                     }

          }

          
          for(var q = 0; q <allRows.length;q++){         
          
           
            thisTable.appendChild(allRows[q]);
           

            counter++;
            
         }
        
         allRows=[];
          
         
      }
      sortingValues=[];

      
      
    
    }
   
    
    
  }
  
  
  } 
  

}, 1800);






function delNote(element) {
ons.notification.confirm({ message: 'Наистина ли искате да изтриете тази бележка?',
title: 'Изтриване на бележка',
cancelable:true,
buttonLabel: ['Не изтривай','ИЗТРИЙ'],
callback: function(answer) {
 if(answer==1){
  element.parentElement.parentElement.remove();
localStorage.notes=  notes.innerHTML;
      }
      checkBadges();
    }
  }) 
  
} 

function checkBadgesReminders() {
  
  var numberBadgesReminders = document.querySelectorAll('#reminders .table tr').length;
  let numberDoneReminders = document.querySelectorAll('.zmdi-check').length;
  let numberDateRows = document.querySelectorAll('th').length;
  let totalRemindersBadge = numberBadgesReminders-numberDoneReminders-numberDateRows;
  var remindersMenu= document.getElementById('remindersMenu');
  remindersMenu.setAttribute("badge", totalRemindersBadge);
}

function checkBadges() {

  var badge = document.getElementById('home');
var checkedBadges = document.getElementsByTagName('s').length;
var numberBadges = (document.getElementsByClassName('list-item__center').length-checkedBadges).toString();
badge.setAttribute("badge", numberBadges);
  }

function strike (element) {

  
 if(element.classList.contains('clicked')){

  element.classList.remove('clicked');

  var parElement = element.parentNode.childNodes[1];
  var text1 = element.parentNode.childNodes[1].firstChild.innerHTML;
  
  
  
  parElement.innerHTML=text1;
  var notes =document.getElementById('notes');  
 localStorage.notes =  notes.innerHTML;

}

else  { 
  var parElement = element.parentNode.childNodes[1];
  var text = element.parentNode.childNodes[1].innerText;
  parElement.innerHTML='<s>'+text+'</s>';
  var notes =document.getElementById('notes');  
 localStorage.notes =  notes.innerHTML;
  var notes =document.getElementById('notes');  
 localStorage.notes =  notes.innerHTML;
 element.classList.add('clicked');

}  

checkBadges();

}


function setDate(){
  var today = new Date();
  today.setDate(today.getDate());
  document.getElementById('date').valueAsDate = today;
  // console.log(today);
 
  
  }


 function toNotes(element) {

  var thisTableId = element.parentElement.parentElement.parentElement.id;
   
  var thistable =  document.querySelectorAll("[id='"+thisTableId+"'] td");
 
 var notes =  document.getElementById('notes');


 for (let i = 1; i <= thistable.length; i+=3) {
 
 
     var li =  document.createElement('ons-list-item');
     li.setAttribute("onclick","editNote(this)");
     if(i-3<=thistable.length){
      '<ons-list-item id="" onclick="editNote(this)"><ons-checkbox onclick="strike(this)"></ons-checkbox><span>'+name+'</span><span class="edit-note" onclick="setOrder(this)"><i class="zmdi zmdi-edit"></i></span><span class="del-note" onclick="delNote(this)">X</span></ons-list-item>';
     li.innerHTML= '<ons-checkbox onclick="strike(this)"></ons-checkbox><span>'+  thistable[i].innerHTML+' | '+ thistable[i+1].innerHTML +'</span><span class="edit-note" onclick="editNote(this)"><i class="zmdi zmdi-edit"></i></span><span class="del-note" onclick="delNote(this)">X</span>';
     

     }
     notes.appendChild(li);
 
   
 }
 checkBadgesReminders();
 checkBadges();




 }

 function doneReminder(element) { 
   if(element.parentElement.childNodes.length<=1){
    var checked = document.createElement('i');
    checked.setAttribute("class","zmdi zmdi-check");
    element.parentElement.appendChild(checked);
    element.parentElement.parentElement.style.textDecoration="line-through";
   }
   else { 
    element.parentElement.childNodes[1].remove();
    element.parentElement.parentElement.style.textDecoration="none";
   }


   saveAndBadgesReminders();
  
 }


 

 function delReminder(element) {   
   element.parentElement.parentElement.remove();

    saveAndBadgesReminders();
 
}




function delAllReminders() { 
  if(localStorage.reminders) 
  {
    ons.notification.confirm({ message: 'Наистина ли искате да изтриете всички известия?',
title: 'Изтриване на известия',
cancelable:true,
buttonLabel: ['Не изтривай','ИЗТРИЙ'],
callback: function(answer) {
 if(answer==1){
  document.getElementById('reminders').innerHTML='';

  saveAndBadgesReminders();
  }
  
}
  });
}
}

function saveAndBadgesReminders() {
  setTimeout(function(){ 
    localStorage.reminders = reminders.innerHTML;

    checkBadgesReminders();


}, 1000);
}


 function delThisDate(element) { 


  var thisTableId = element.parentElement.parentElement.parentElement.parentElement.id;
  
  var thistable =  document.querySelector("[id='"+thisTableId+"']");

  thistable.remove();

  saveAndBadgesReminders();

 }


 function delAllNotes() { 
  var notes = document.getElementById('notes');
  notes.innerHTML='';
   localStorage.notes= notes.innerHTML;
   checkBadges();
 }

  //  Plugins




// eof Plugins




/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in this js code but may be useful to you

// All pages to be loaded
var pages = [
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-4.html",
	"instructions/instruct-5.html",
	"instructions/instruct-6.html",
    "instructions/instruct-7.html",
    "instructions/instruct-8.html",
    "instructions/instruct-9.html",
    "instructions/instruct-10.html",
    "instructions/instruct-ready.html",
	"stage.html",
    "aqquestionnaire.html",
	"postquestionnaire.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-4.html",
	"instructions/instruct-5.html",
	"instructions/instruct-6.html",
    "instructions/instruct-7.html",
    "instructions/instruct-8.html",
    "instructions/instruct-9.html",
    "instructions/instruct-10.html",
    "instructions/instruct-ready.html",
];


/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
********************/


/********************
* Practice block     *
********************/

var block = 1;


// function readColorSpace(file){
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 allText = rawFile.responseText.split("\n");
//                 //allText = rawFile.responseText.toString().split("\n");
//                 //console.log(allText);
//                 var arr1 = [];
//                 allText.map(function(item){
//                   var tabs = item.split('\t');
//                   //console.log("0",tabs[0], "1",tabs[1], "2",tabs[2],"3", tabs[3],"4", tabs[4]);
//                   arr1.push(tabs[0]);
//                   arr1.push(tabs[1]);
//                   arr1.push(tabs[2]);
//                 });
//                 input = [];
//                 var tab = [];
//                 for (var i = 0; i < 360; i++){
//                     for (var j = 0; j<3; j++){
//                         tab[j] = parseFloat(arr1[3*i+j]);
//                     };
//                     input[i] = [tab[0],tab[1],tab[2]];
                    
//                 };
                
//             colorspace =input;
//             //console.log(colorspace);              
//             }
//         }
//     }
//     rawFile.send(null);
// };
    
function createhighlist(){
    var trial_list = [];
    for(irep = 0;irep<30;irep++){
        for (var i_testc = 0;i_testc<2;i_testc++){
            var temp=[0,1,2,3,4,5];
            temp=_.shuffle(temp)
            var pmiloc = temp[0];
            var imiloc = temp[1];
            var cloc = temp[1];
            trial_list.push([pmiloc,imiloc,cloc,i_testc]);
        }
        
    }
    trial_list=_.shuffle(trial_list);
    //console.log(trial_list)
    return trial_list;
};

function createlowlist(){
    var trial_list = [];
    for(irep = 0;irep<30;irep++){
        for (var i_testc = 0;i_testc<2;i_testc++){
            var temp=[0,1,2,3,4,5];
            temp=_.shuffle(temp)
            var pmiloc = temp[0];
            var imiloc = temp[1];
            var cloc = temp[2];
            trial_list.push([pmiloc,imiloc,cloc,i_testc]);
        }
    }
    trial_list=_.shuffle(trial_list);
    //console.log(trial_list)
    return trial_list;
};

function createhighpraclist(){
    var trial_list = [];
    for(irep = 0;irep<2;irep++){
        for (var i_testc = 0;i_testc<2;i_testc++){
            var temp=[0,1,2,3,4,5];
            temp=_.shuffle(temp)
            var pmiloc = temp[0];
            var imiloc = temp[1];
            var cloc = temp[1];
            trial_list.push([pmiloc,imiloc,cloc,i_testc]);
        }
        
    }
    trial_list=_.shuffle(trial_list);
    //console.log(trial_list)
    return trial_list;
};
function createlowpraclist(){
    var trial_list = [];
    for(irep = 0;irep<2;irep++){
        for (var i_testc = 0;i_testc<2;i_testc++){
            var temp=[0,1,2,3,4,5];
            temp=_.shuffle(temp)
            var pmiloc = temp[0];
            var imiloc = temp[1];
            var cloc = temp[2];
            trial_list.push([pmiloc,imiloc,cloc,i_testc]);
        }
    }
    trial_list=_.shuffle(trial_list);
    //console.log(trial_list)
    return trial_list;
};

var Practice1 = function() {
    
    high_list = createhighpraclist();
    low_list = createlowpraclist();
    if (mycondition==1){
        prac_list=high_list;
    } else {
        prac_list=low_list;
    }
    trial_count = 0;
    practice = 1;

    var next = function() {
        if (trial_count==4) {//number of practice trials
            var s = Snap('#svgMain');
            s.clear();
            clearTimeout(handle12);
            finish();
        }
        else {
            var s = Snap('#svgMain');
            pick_cond = prac_list.shift();
            s.clear();
            timefxt = 750; // iti=1250
            timesample1 = 2000; //1s
            timedelay1 = 1500;
            timecue = 1750;     //0.75
            timedelay2 = 2250;
            timesample2 = 1500;  //0.5
            timedelay3 = 2000;
            //probe
            timeiti = 1250
            timedefxt = 750 
            timedesample = 1750 //0.75
            timededelay = 2250
            //probe
            realiti = 2000
           
            show_fixation();
            clearTimeout();
            
            handle = setTimeout(function(){
                show_sample1();},timefxt); 
            handle2 = setTimeout(function(){
                show_delay1();},timefxt+timesample1);
            handle3 = setTimeout(function(){
                cue_maintain();},timefxt+timesample1+timedelay1);
            handle4 = setTimeout(function(){
                show_delay2()},timefxt+timesample1+timedelay1+timecue);
            handle5 = setTimeout(function(){
                show_sample2()},timefxt+timesample1+timedelay1+timecue+timedelay2);
            handle6 = setTimeout(function(){
                show_delay3()},timefxt+timesample1+timedelay1+timecue+timedelay2+timesample2);
            handle7 = setTimeout(function(){
                show_probe1()},timefxt+timesample1+timedelay1+timecue+timedelay2+timesample2+timedelay3);
        }
    };
        

    var finish = function() {
        var s = Snap('#svgMain');
        var afterprac1 = s.text(540,400,"You have finished practice. Now the experiment will begin. This time the pace of the experiment will be faster. Please pay close attention.").attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
        var text = s.text(540,450,"Press Spacebar to continue.").attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
        //$("body").unbind("keydown", response_handler); // Unbind keys
        document.addEventListener("keydown",finishprac, false);
    };
        
    var finishprac = function(e){
            if (e.keyCode == 32) {
                document.removeEventListener("keydown",finishprac,false);
                currentview = new MainTask();
            }
    };
    var show_fixation = function(){
        document.body.style.cursor = 'none';
        var s = Snap('#svgMain');
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "red", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "red", 
          strokeWidth:5
        });
        var fixationinst1 = s.text(540,500,'Trial begins').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});

    };

    var show_sample1 = function(){
        var s = Snap('#svgMain');
        s.clear();
        center_x = 540;
        center_y = 400;
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });
        // oriset = [7.5,22.5,7.5,52.5,67.5,82.5,97.5,112.5,127.5,142.5,157.5,172.5];
        // orientation1 = oriset[Math.floor(Math.random()*12)];
        orientation1 = Math.floor(Math.random()*180); //rotation
        locset=[30,90,150,210,270,330];
        pmiloc=pick_cond[0];
        imiloc=pick_cond[1];
        pmitheta=locset[pmiloc];
        imitheta=locset[imiloc];
        
        radius=300;
        var pmixloc=radius*Math.cos(toRadians(pmitheta-90))+540
        var pmiyloc=radius*Math.sin(toRadians(pmitheta-90))+400
        // color1 = Math.floor(Math.random()*360);
        rand_str = orientation1.toString();
        var pmixlocation=pmixloc.toString();
        var pmiylocation=pmiyloc.toString();
        var str1 = 'R';
        pmistr = str1.concat(rand_str,',',pmixlocation,',',pmiylocation);
        circledia=140;
        var x = pmixloc - circledia/2;
        var y = pmiyloc - circledia/2;
        gabor_list = ['gabor140-1.png','gabor140-2.png','gabor140-3.png','gabor140-4.png','gabor140-5.png'];
        gaborpath = '/static/images/'
        var gabornow= gaborpath.concat(gabor_list[Math.floor(Math.random()*5)]);
        var pmipatch = s.image(gabornow,x,y)//.attr({filter:f});});

        pmipatch.transform(pmistr);   
        pmipatch.attr({
          id:"patch"});
         
        orientation2 = Math.floor(Math.random()*180); //rotation
        var imixloc=radius*Math.cos(toRadians(imitheta-90))+540
        var imiyloc=radius*Math.sin(toRadians(imitheta-90))+400
        // color1 = Math.floor(Math.random()*360);
        rand_str = orientation2.toString();
        var imixlocation=imixloc.toString();
        var imiylocation=imiyloc.toString();
        var str1 = 'R';
        imistr = str1.concat(rand_str,',',imixlocation,',',imiylocation);
        var x = imixloc - circledia/2;
        var y = imiyloc - circledia/2;
        
        var gabornow= gaborpath.concat(gabor_list[Math.floor(Math.random()*5)]);
        var imipatch = s.image(gabornow,x,y)//.attr({filter:f});});

        imipatch.transform(imistr);   
        imipatch.attr({
            id:"patch"});

        var sampleinst1 = s.text(540,795,'Memorize the line direction').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
    }; 


    var show_delay1 = function(){
        var s = Snap('#svgMain');
        s.clear();
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });
    };

    var cue_maintain = function(){
        var s = Snap('#svgMain');
        s.clear();
        center_x = 540;
        center_y = 400;
        
        var pmixloc=radius*Math.cos(toRadians(pmitheta-90))+540
        var pmiyloc=radius*Math.sin(toRadians(pmitheta-90))+400
        var pmixlocation=pmixloc.toString();
        var pmiylocation=pmiyloc.toString();
        var str1 = 'R';
        var pmistr = str1.concat(rand_str,',',pmixlocation,',',pmiylocation);
        var cuecircle = s.circle(pmixloc, pmiyloc, 70);

        cuecircle.transform(pmistr).attr({'fill' : 'black',  'stroke': 'white', 'stroke-width': 2});;   
        cuecircle.attr({
          id:"cuecircle"});
    
        var cueinst = s.text(540,795,'Maintain the memory of the patch shown at this location').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
    }; 

    var show_delay2 = function(){
        var s = Snap('#svgMain');
        s.clear();
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });
    };

    var show_sample2 = function(){
        var s = Snap('#svgMain');
        s.clear();
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });

        center_x = 540;
        center_y = 400;
        
        location3 = pick_cond[2];
        
        var theta=locset[location3];
        var cxloc=radius*Math.cos(toRadians(theta-90))+540
        var cyloc=radius*Math.sin(toRadians(theta-90))+400

        orientation3 = Math.floor(Math.random()*180); //rotation
        rand_str = orientation3.toString();
        var cxlocation=cxloc.toString();
        var cylocation=cyloc.toString();
        var str1 = 'R';
        cstr = str1.concat(rand_str,',',cxlocation,',',cylocation);
        var x = cxloc - circledia/2;
        var y = cyloc - circledia/2;
        var gabornow= gaborpath.concat(gabor_list[Math.floor(Math.random()*5)]);
        cpatch = s.image(gabornow,x,y)//.attr({filter:f});});

        cpatch.transform(cstr);   
        cpatch.attr({
          id:"patch"});

        var sampleinst2 = s.text(540,795,'Memorize the line direction').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
    }; 

   var show_delay3 = function(){
        var s = Snap('#svgMain');
        s.clear();
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });
    };


    var show_probe1 = function(e){
        document.body.style.cursor = 'auto';
        blocktype = 1;
        if (blocktype == 1){
            s = Snap('#svgMain');
            s.clear();
            var probeinst1 = s.text(540,765,'Click around to report the memorized line direction').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
            var probeinst2 = s.text(540,795,'You may click mutiple times to adjust your answer. Press spacebar to continue.').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
            // var probeinst3 = s.text(540,795,'Press spacebar to continue.').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});

            //var probe_ins = s.image("/static/images/ProbeInstruction.png",180,550);
            probe_fixation();

            response1_start = new Date().getTime();
            resp = 0;
            document.addEventListener("mousedown",getClickPositionOri, false);
        }
        else {
            //show color wheel
            s = Snap('#svgMain');
            s.clear();
            
            show_wheel();
            document.addEventListener("mousedown",getClickPositionClr, false);
            response1_start = new Date().getTime();
            resp = 0;
        }
    };

    var getClickPositionOri = function(evt) {
        var e = evt.target;
        var dim = document.getElementById("svgMain").getBoundingClientRect();
        xPos = evt.clientX-dim.left;
        yPos = evt.clientY-dim.top;
        new_x = xPos;
        new_y = yPos;
    
        show_report();
        document.addEventListener("keypress", tonext, false);
    };

    // var getClickPositionClr = function(evt) {
    //     var e = evt.target;
    //     var dim = document.getElementById("svgMain").getBoundingClientRect();
    //     xPos = evt.clientX-dim.left;
    //     yPos = evt.clientY-dim.top;
    //     new_x = xPos;
    //     new_y = yPos;
    //     probe_ori = target1_ori;
    //     show_report2();
    //     document.addEventListener("keypress", tonext, false);
    // };

    var tonext = function(e){
        if (e.charCode == 32){
            wmreport1 = report;
            rt1 = new Date().getTime() - response1_start;
            if (blocktype==1){
                document.removeEventListener("mousedown",getClickPositionOri, false);
            }
            else {
                document.removeEventListener("mousedown",getClickPositionClr, false);
            }
            document.removeEventListener("keypress",tonext,false);
            iti2de();  
            
        };
    };
    
    var iti2de = function(){
        var s = Snap('#svgMain');
        document.body.style.cursor = 'none';
        s.clear();
        
        handle8 = setTimeout(function(){
            de_fix()},timeiti);
    };
    var de_fix = function(){
        var s = Snap('#svgMain');
        document.body.style.cursor = 'none';
        s.clear();
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });
        handle9 = setTimeout(function(){
            de_sample()},timedefxt);
    };

    var de_sample = function(){
        var s = Snap('#svgMain');
        s.clear();
        center_x = 540;
        center_y = 400;
        deorientation = Math.floor(Math.random()*180); //rotation
        rand_str = deorientation.toString();
        var str1 = 'R';
        var str2 = ', 540, 400';
        var str = str1.concat(rand_str,str2);
        var x = 540 - circledia/2;
        var y = 400 - circledia/2;
        degabornow= gaborpath.concat(gabor_list[Math.floor(Math.random()*5)]);
        depatch = s.image(degabornow,x,y);//.attr({filter:f});

        depatch.transform(str);   
        depatch.attr({
          id:"patch"});

        var cueinst1 = s.text(540,600,'Memorize the line direction').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
        handle10 = setTimeout(function(){
            de_delay()},timedesample);
    };
    
    var de_delay = function(){
        var s = Snap('#svgMain');
        s.clear();
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });
        handle11 = setTimeout(function(){
            de_probe()},timededelay);
    };

    var de_probe = function(e){
        document.body.style.cursor = 'auto';
        blocktype = 1;
        if (blocktype == 1){
            s = Snap('#svgMain');
            s.clear();
            var probeinst1 = s.text(540,765,'Click around to report the memorized line direction').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
            var probeinst2 = s.text(540,795,'You may click mutiple times to adjust your answer. Press spacebar to continue.').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
            // var probeinst3 = s.text(540,660,'Press spacebar to continue.').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});

            //var probe_ins = s.image("/static/images/ProbeInstruction.png",180,550);
            de_probe_fixation();

            response2_start = new Date().getTime();
            resp = 0;
            document.addEventListener("mousedown",de_getClickPositionOri, false);
        }
        else {
            //show color wheel
            s = Snap('#svgMain');
            s.clear();
            
            show_wheel();
            document.addEventListener("mousedown",getClickPositionClr, false);
            response1_start = new Date().getTime();
            resp = 0;
        }
    };

    var de_getClickPositionOri = function(evt) {
        var e = evt.target;
        var dim = document.getElementById("svgMain").getBoundingClientRect();
        xPos = evt.clientX-dim.left;
        yPos = evt.clientY-dim.top;
        new_x = xPos;
        new_y = yPos;
        de_show_report();
        document.addEventListener("keypress", tonext2, false);
    };

    // var getClickPositionClr2 = function(evt) {
    //     var e = evt.target;
    //     var dim = document.getElementById("svgMain").getBoundingClientRect();
    //     xPos = evt.clientX-dim.left;
    //     yPos = evt.clientY-dim.top;
    //     new_x = xPos;
    //     new_y = yPos;
    //     probe_ori = target2_ori;
    //     show_report2();
    //     document.addEventListener("keypress", tonext2, false);
    // };

    var tonext2 = function(e){
        if (e.charCode == 32){
            wmreport2 = de_report;
            //console.log(last_angle/Math.PI*180);
            rt2 = new Date().getTime() - response2_start;
            if (blocktype==1){
                document.removeEventListener("mousedown",de_getClickPositionOri, false);
            }
            else {
                document.removeEventListener("mousedown",getClickPositionClr2, false);
            }
            document.removeEventListener("keypress",tonext2,false);
            ITI();  
            
        };
    };
            
            
    var ITI = function(e){
        var s = Snap('#svgMain');
        s.clear();
        if(practice == 1){
            if(mycondition==1){
                trialconflict=2;
            } else{
                trialconflict=1;
            }
            psiTurk.recordTrialData({'phase':"PRAC",
                'pmiori':orientation1,
                'imiori':orientation2,
                'cori':orientation3,
                'testc':testc,
                'report':wmreport1,
                'pmiloc':pmiloc,
                'imiloc':imiloc,
                'cloc':location3,
                'RT1':rt1,
                'deori':deorientation,
                'dereport':wmreport2,
                'deRT':rt2,
                'trial': trial_count,
                'ordercondition':mycondition,
                'trialconflict':trialconflict,
            });
        };
        trial_count ++;
        //console.log(color1,color2,wmreport1,wmreport2,target1_color,target2_color);
        handle12 = setTimeout(function(){
            next()},realiti);
    };

        
   


    // Load the stage.html snippet into the body of the page
    psiTurk.showPage('stage.html');

    // Register the response handler that is defined above to handle any
    // key down events.
    //$("body").focus().keydown(response_handler); 

    // Start the test
    
    next();
};
////////////////////////////////////////////////
var MainTask = function() {
    
    high_list = createhighlist();
    low_list = createlowlist();
    if (mycondition==1){
        trial_list=high_list.concat(low_list);
    } else {
        trial_list=low_list.concat(high_list);
    }
    trial_count = 0;
    practice = 0;

    var next = function() {
        if (trial_count==120) {//number of practice trials
            var s = Snap('#svgMain');
            s.clear();
            clearTimeout(handle12);
            finish();
        }
        else {
            var s = Snap('#svgMain');
            pick_cond = trial_list.shift();
            s.clear();
            timefxt = 750; // iti=1250
            timesample1 = 1000;
            timedelay1 = 1500;
            timecue = 750;
            timedelay2 = 2250;
            timesample2 = 500;
            timedelay3 = 2000;
            //probe
            timeiti = 1250
            timedefxt = 750
            timedesample = 750
            timededelay = 2250
            //probe
            realiti = 2000
           
            show_fixation();
            clearTimeout();
            
            handle = setTimeout(function(){
                show_sample1();},timefxt); 
            handle2 = setTimeout(function(){
                show_delay1();},timefxt+timesample1);
            handle3 = setTimeout(function(){
                cue_maintain();},timefxt+timesample1+timedelay1);
            handle4 = setTimeout(function(){
                show_delay2()},timefxt+timesample1+timedelay1+timecue);
            handle5 = setTimeout(function(){
                show_sample2()},timefxt+timesample1+timedelay1+timecue+timedelay2);
            handle6 = setTimeout(function(){
                show_delay3()},timefxt+timesample1+timedelay1+timecue+timedelay2+timesample2);
            handle7 = setTimeout(function(){
                show_probe1()},timefxt+timesample1+timedelay1+timecue+timedelay2+timesample2+timedelay3);
        }
    };
        

    var finish = function() {
        var s = Snap('#svgMain');
        var afterprac1 = s.text(540,400,"Great job! You have completed the experiment.").attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
        var text = s.text(540,450,"Press Spacebar to continue.").attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
        //$("body").unbind("keydown", response_handler); // Unbind keys
        document.addEventListener("keydown",finishprac, false);
    };
        
    var finishprac = function(e){
            if (e.keyCode == 32) {
                document.removeEventListener("keydown",finishprac,false);
                currentview = new Questionnaire();
            }
    };
    var show_fixation = function(){
        trialstart = new Date().getTime();
        document.body.style.cursor = 'none';
        var s = Snap('#svgMain');
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "red", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "red", 
          strokeWidth:5
        });

    };

    var show_sample1 = function(){
        var s = Snap('#svgMain');
        s.clear();
        center_x = 540;
        center_y = 400;
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });
        // oriset = [7.5,22.5,7.5,52.5,67.5,82.5,97.5,112.5,127.5,142.5,157.5,172.5];
        // orientation1 = oriset[Math.floor(Math.random()*12)];
        orientation1 = Math.floor(Math.random()*180); //rotation
        locset=[30,90,150,210,270,330];
        pmiloc=pick_cond[0];
        imiloc=pick_cond[1];
        pmitheta=locset[pmiloc];
        imitheta=locset[imiloc];
        
        radius=300;
        var pmixloc=radius*Math.cos(toRadians(pmitheta-90))+540
        var pmiyloc=radius*Math.sin(toRadians(pmitheta-90))+400
        // color1 = Math.floor(Math.random()*360);
        rand_str = orientation1.toString();
        var pmixlocation=pmixloc.toString();
        var pmiylocation=pmiyloc.toString();
        var str1 = 'R';
        pmistr = str1.concat(rand_str,',',pmixlocation,',',pmiylocation);
        circledia=140;
        var x = pmixloc - circledia/2;
        var y = pmiyloc - circledia/2;
        gabor_list = ['gabor140-1.png','gabor140-2.png','gabor140-3.png','gabor140-4.png','gabor140-5.png'];
        gaborpath = '/static/images/'
        var gabornow= gaborpath.concat(gabor_list[Math.floor(Math.random()*5)]);
        var pmipatch = s.image(gabornow,x,y)//.attr({filter:f});});

        pmipatch.transform(pmistr);   
        pmipatch.attr({
          id:"patch"});
         
        orientation2 = Math.floor(Math.random()*180); //rotation
        var imixloc=radius*Math.cos(toRadians(imitheta-90))+540
        var imiyloc=radius*Math.sin(toRadians(imitheta-90))+400
        // color1 = Math.floor(Math.random()*360);
        rand_str = orientation2.toString();
        var imixlocation=imixloc.toString();
        var imiylocation=imiyloc.toString();
        var str1 = 'R';
        imistr = str1.concat(rand_str,',',imixlocation,',',imiylocation);
        var x = imixloc - circledia/2;
        var y = imiyloc - circledia/2;
        
        var gabornow= gaborpath.concat(gabor_list[Math.floor(Math.random()*5)]);
        var imipatch = s.image(gabornow,x,y)//.attr({filter:f});});

        imipatch.transform(imistr);   
        imipatch.attr({
            id:"patch"});
        
    }; 


    var show_delay1 = function(){
        var s = Snap('#svgMain');
        s.clear();
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });
    };

    var cue_maintain = function(){
        var s = Snap('#svgMain');
        s.clear();
        center_x = 540;
        center_y = 400;
        
        var pmixloc=radius*Math.cos(toRadians(pmitheta-90))+540
        var pmiyloc=radius*Math.sin(toRadians(pmitheta-90))+400
        var pmixlocation=pmixloc.toString();
        var pmiylocation=pmiyloc.toString();
        var str1 = 'R';
        var pmistr = str1.concat(rand_str,',',pmixlocation,',',pmiylocation);
        var cuecircle = s.circle(pmixloc, pmiyloc, 70);

        cuecircle.transform(pmistr).attr({'fill' : 'black',  'stroke': 'white', 'stroke-width': 2});;   
        cuecircle.attr({
          id:"cuecircle"});
    
    }; 

    var show_delay2 = function(){
        var s = Snap('#svgMain');
        s.clear();
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });
    };

    var show_sample2 = function(){
        var s = Snap('#svgMain');
        s.clear();
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });

        center_x = 540;
        center_y = 400;
        
        location3 = pick_cond[2];
        
        var theta=locset[location3];
        var cxloc=radius*Math.cos(toRadians(theta-90))+540
        var cyloc=radius*Math.sin(toRadians(theta-90))+400

        orientation3 = Math.floor(Math.random()*180); //rotation
        rand_str = orientation3.toString();
        var cxlocation=cxloc.toString();
        var cylocation=cyloc.toString();
        var str1 = 'R';
        cstr = str1.concat(rand_str,',',cxlocation,',',cylocation);
        var x = cxloc - circledia/2;
        var y = cyloc - circledia/2;
        var gabornow= gaborpath.concat(gabor_list[Math.floor(Math.random()*5)]);
        cpatch = s.image(gabornow,x,y)//.attr({filter:f});});

        cpatch.transform(cstr);   
        cpatch.attr({
          id:"patch"});
    }; 

   var show_delay3 = function(){
        var s = Snap('#svgMain');
        s.clear();
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });
    };


    var show_probe1 = function(e){
        document.body.style.cursor = 'auto';
        blocktype = 1;
        if (blocktype == 1){
            s = Snap('#svgMain');
            s.clear();
            // var probeinst1 = s.text(540,720,'Click around to report the memorized line direction').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
            // var probeinst2 = s.text(540,750,'You may click mutiple times to adjust your answer').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
            // var probeinst3 = s.text(540,780,'Press spacebar to continue.').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});

            //var probe_ins = s.image("/static/images/ProbeInstruction.png",180,550);
            probe_fixation();

            response1_start = new Date().getTime();
            resp = 0;
            document.addEventListener("mousedown",getClickPositionOri, false);
        }
        else {
            //show color wheel
            s = Snap('#svgMain');
            s.clear();
            
            show_wheel();
            document.addEventListener("mousedown",getClickPositionClr, false);
            response1_start = new Date().getTime();
            resp = 0;
        }
    };

    var getClickPositionOri = function(evt) {
        var e = evt.target;
        var dim = document.getElementById("svgMain").getBoundingClientRect();
        xPos = evt.clientX-dim.left;
        yPos = evt.clientY-dim.top;
        new_x = xPos;
        new_y = yPos;
    
        show_report();
        document.addEventListener("keypress", tonext, false);
    };

    // var getClickPositionClr = function(evt) {
    //     var e = evt.target;
    //     var dim = document.getElementById("svgMain").getBoundingClientRect();
    //     xPos = evt.clientX-dim.left;
    //     yPos = evt.clientY-dim.top;
    //     new_x = xPos;
    //     new_y = yPos;
    //     probe_ori = target1_ori;
    //     show_report2();
    //     document.addEventListener("keypress", tonext, false);
    // };

    var tonext = function(e){
        if (e.charCode == 32){
            wmreport1 = report;
            rt1 = new Date().getTime() - response1_start;
            if (blocktype==1){
                document.removeEventListener("mousedown",getClickPositionOri, false);
            }
            else {
                document.removeEventListener("mousedown",getClickPositionClr, false);
            }
            document.removeEventListener("keypress",tonext,false);
            iti2de();  
            
        };
    };
    
    var iti2de = function(){
        var s = Snap('#svgMain');
        document.body.style.cursor = 'none';
        s.clear();
        
        handle8 = setTimeout(function(){
            de_fix()},timeiti);
    };
    var de_fix = function(){
        var s = Snap('#svgMain');
        document.body.style.cursor = 'none';
        s.clear();
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });
        handle9 = setTimeout(function(){
            de_sample()},timedefxt);
    };

    var de_sample = function(){
        var s = Snap('#svgMain');
        s.clear();
        center_x = 540;
        center_y = 400;
        deorientation = Math.floor(Math.random()*180); //rotation
        rand_str = deorientation.toString();
        var str1 = 'R';
        var str2 = ', 540, 400';
        var str = str1.concat(rand_str,str2);
        var x = 540 - circledia/2;
        var y = 400 - circledia/2;
        degabornow= gaborpath.concat(gabor_list[Math.floor(Math.random()*5)]);
        depatch = s.image(degabornow,x,y);//.attr({filter:f});

        depatch.transform(str);   
        depatch.attr({
          id:"patch"});

        handle10 = setTimeout(function(){
            de_delay()},timedesample);
    };
    
    var de_delay = function(){
        var s = Snap('#svgMain');
        s.clear();
        var horizontal = s.line(530,400,550,400);
        horizontal.attr({
          id:"fix1",
          stroke: "white", 
          strokeWidth:5
        });
        var vertical = s.line(540, 390, 540, 410);
        vertical.attr({
          id:"fix2",
          stroke: "white", 
          strokeWidth:5
        });
        handle11 = setTimeout(function(){
            de_probe()},timededelay);
    };

    var de_probe = function(e){
        document.body.style.cursor = 'auto';
        blocktype = 1;
        if (blocktype == 1){
            s = Snap('#svgMain');
            s.clear();
            //var probe_ins = s.image("/static/images/ProbeInstruction.png",180,550);
            de_probe_fixation();

            response2_start = new Date().getTime();
            resp = 0;
            document.addEventListener("mousedown",de_getClickPositionOri, false);
        }
        else {
            //show color wheel
            s = Snap('#svgMain');
            s.clear();
            
            show_wheel();
            document.addEventListener("mousedown",getClickPositionClr, false);
            response1_start = new Date().getTime();
            resp = 0;
        }
    };

    var de_getClickPositionOri = function(evt) {
        var e = evt.target;
        var dim = document.getElementById("svgMain").getBoundingClientRect();
        xPos = evt.clientX-dim.left;
        yPos = evt.clientY-dim.top;
        new_x = xPos;
        new_y = yPos;
        de_show_report();
        document.addEventListener("keypress", tonext2, false);
    };

    // var getClickPositionClr2 = function(evt) {
    //     var e = evt.target;
    //     var dim = document.getElementById("svgMain").getBoundingClientRect();
    //     xPos = evt.clientX-dim.left;
    //     yPos = evt.clientY-dim.top;
    //     new_x = xPos;
    //     new_y = yPos;
    //     probe_ori = target2_ori;
    //     show_report2();
    //     document.addEventListener("keypress", tonext2, false);
    // };

    var tonext2 = function(e){
        if (e.charCode == 32){
            wmreport2 = de_report;
            //console.log(last_angle/Math.PI*180);
            rt2 = new Date().getTime() - response2_start;
            if (blocktype==1){
                document.removeEventListener("mousedown",de_getClickPositionOri, false);
            }
            else {
                document.removeEventListener("mousedown",getClickPositionClr2, false);
            }
            document.removeEventListener("keypress",tonext2,false);
            ITI();  
            
        };
    };
            
            
    var ITI = function(e){
        var s = Snap('#svgMain');
        s.clear();
        if(practice !== 1){
            if(mycondition==1){
                if(trial_count<60){
                    trialconflict=2;
                } else{
                    trialconflict=1;
                }
            } else{
                if(trial_count<60){
                    trialconflict=1;
                } else{
                    trialconflict=2;
                }
            }
            psiTurk.recordTrialData({'phase':"TEST",
                'pmiori':orientation1,
                'imiori':orientation2,
                'cori':orientation3,
                'testc':testc,
                'report':wmreport1,
                'pmiloc':pmiloc,
                'imiloc':imiloc,
                'cloc':location3,
                'RT1':rt1,
                'deori':deorientation,
                'dereport':wmreport2,
                'deRT':rt2,
                'trial': trial_count,
                'ordercondition':mycondition,
                'trialconflict':trialconflict,
            });
        };
        trial_count ++;
        //console.log(color1,color2,wmreport1,wmreport2,target1_color,target2_color);
        // if (trial_count==60) { //switch block type
        //     var x=540-900/2;
        //     var y=400-352/2;
        //     depatch = s.image("/static/images/lowins6.png",x,y);
        //     document.addEventListener("keypress", tonextins, false); //press p
        // } else {
        //     handle12 = setTimeout(function(){
        //         ifbreak()},realiti);
        // }

        handle12 = setTimeout(function(){
            ifbreak()},realiti);
    };


    // var tonextins = function(e){
    //     if (e.charCode == 112){ //press p
    //         document.removeEventListener("keypress",tonextins,false);
    //         next();  
            
    //     };
    // };

    var ifbreak = function(){
        clearTimeout(handle12);
        if (trial_count % 20 == 0 && trial_count != 120){
            var s = Snap('#svgMain');
            s.clear();
            blocknum = trial_count/20;
            var progress = 6-blocknum;
            var str1 = progress.toString();
            var str2 = " out of 6 blocks left for the entire experiment. Press spacebar to continue";
            var info = str1.concat(str2);

            var infotext = s.text(500,320,info).attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
            var infotext2 = s.text(500,300,"You are doing great! Please take a break.").attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});

            document.addEventListener("keypress",nextblock,false);

            //blocktype = blockorder.shift();
        }
        else{
            trialend = new Date().getTime();
            trialtime = trialend-trialstart;
            console.log(trialtime)
            next();
        };
    };

    var nextblock = function(e){
        if (e.keyCode == 32){
            var s = Snap('#svgMain');
            s.clear();
            document.removeEventListener("keypress",nextblock,false);
            if (blocknum==3) { //switch block type
                var x=540-900/2;
                var y=400-516/2;
                if (mycondition==1) {
                    interins = s.image("/static/images/low1interins.png",x,y);
                } else {
                    interins = s.image("/static/images/low0interins.png",x,y);
                }
                document.addEventListener("keypress", tonextins, false); //press p
            } else {
                next();
            }
            
        }
    };

    var tonextins = function(e){
        if (e.charCode == 112){ //press p
            document.removeEventListener("keypress",tonextins,false);
            next();  
            
        };
    };

    // Load the stage.html snippet into the body of the page
    psiTurk.showPage('stage.html');

    // Register the response handler that is defined above to handle any
    // key down events.
    //$("body").focus().keydown(response_handler); 

    // Start the test
    
    next();
};
//////////////////////////////////////////
// var MainTask = function() {
//     trial_list = createlist();
//     trial_count = 0;
//     practice = 0;

//     var next = function() {
//         if (trial_count==160) {//number of trials
//             var s = Snap('#svgMain');
//             s.clear();
//             clearTimeout(handle7);
//             finish();
//         }
//         else {
//             var s = Snap('#svgMain');
//             pick_cond = trial_list.shift();
//             s.clear();
//             timefxt = 500;
//             timesample1 = 500;
//             timesoa1 = 500;
//             timesample2 = 500;
//             timedelay11 = 1000;
//             timecue1 = 500;
//             timedelay12 = 1000;
//             timeprobe1 = 2500;
//             timesoa2 = 500;
//             timecue2 = 500;
//             timedelay2= 1000;
//             timeprobe2 = 2500;
           
//             show_fixation();
//             clearTimeout();
            
//             handle = setTimeout(function(){
//                 show_sample1();},timefxt); 
//             handle2 = setTimeout(function(){
//                 SOA1();},timefxt+timesample1);
//             handle3 = setTimeout(function(){
//                 show_sample2();},timefxt+timesample1+timesoa1);
//             handle4 = setTimeout(function(){
//                 show_delay11()},timefxt+timesample1+timesoa1+timesample2);
//             handle5 = setTimeout(function(){
//                 show_cue1()},timefxt+timesample1+timesoa1+timesample2+timedelay11);
//             handle6 = setTimeout(function(){
//                 show_delay12()},timefxt+timesample1+timesoa1+timesample2+timedelay11+timecue1);
//             handle7 = setTimeout(function(){
//                 show_probe1()},timefxt+timesample1+timesoa1+timesample2+timedelay11+timecue1+timedelay12);
//         }
//     };
        

//     var finish = function() {
//         var s = Snap('#svgMain');
//         var afterprac1 = s.text(540,400,"Great job! You have completed the experiment.").attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
//         var text = s.text(540,450,"Press Spacebar to continue.").attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
//         //$("body").unbind("keydown", response_handler); // Unbind keys
//         document.addEventListener("keydown",finishprac, false);
//     };
        
//     var finishprac = function(e){
//             if (e.keyCode == 32) {
//                 document.removeEventListener("keydown",finishprac,false);
//                 currentview = new Questionnaire();
//             }
//     };
//     var show_fixation = function(){
//         trialstart = new Date().getTime();
//         document.body.style.cursor = 'none';
//         var s = Snap('#svgMain');
//         var horizontal = s.line(530,400,550,400);
//         horizontal.attr({
//           id:"fix1",
//           stroke: "red", 
//           strokeWidth:5
//         });
//         var vertical = s.line(540, 390, 540, 410);
//         vertical.attr({
//           id:"fix2",
//           stroke: "red", 
//           strokeWidth:5
//         });
//     };

//     var show_sample1 = function(){
//         var s = Snap('#svgMain');
//         s.clear();
//         center_x = 540;
//         center_y = 400;
//         oriset = [7.5,22.5,7.5,52.5,67.5,82.5,97.5,112.5,127.5,142.5,157.5,172.5];
//         orientation1 = oriset[Math.floor(Math.random()*12)]; //rotation
//         color1 = Math.floor(Math.random()*360);
//         rand_str = orientation1.toString();
//         var str1 = 'R';
//         var str2 = ', 540, 400';
//         var str = str1.concat(rand_str,str2);
//         var x = 540 - 250/2;
//         var y = 400 - 250/2;

//         var r = colorspace[color1][0]/255;
//         var g = colorspace[color1][1]/255;
//         var b = colorspace[color1][2]/255;

//         rand_str = orientation1.toString();
//         var str1 = 'R';
//         var str2 = ', 540, 400';
//         var str = str1.concat(rand_str,str2);
//         var myFilter = '<filter id="colorfilter"><feColorMatrix in="SourceGraphic" type="matrix" color-interpolation-filters="sRGB" values="1 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/></filter>';
//         s.append( Snap.parse(myFilter));
//         convertToTone(r,g,b);
//         f = Snap('#colorfilter');
//         var x = 540 - 250/2;
//         var y = 400 - 250/2;
//         var patch = s.image("/static/images/patch320.png",x,y).attr({filter:f});

//         patch.transform(str);   
//         patch.attr({
//           id:"patch"});

//         //var cueinst1 = s.text(540,600,'Memorize the color').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
//     }; 


//     var SOA1 = function(){
//         var s = Snap('#svgMain');
//         s.clear();
//         var horizontal = s.line(530,400,550,400);
//         horizontal.attr({
//           id:"fix1",
//           stroke: "white", 
//           strokeWidth:5
//         });
//         var vertical = s.line(540, 390, 540, 410);
//         vertical.attr({
//           id:"fix2",
//           stroke: "white", 
//           strokeWidth:5
//         });
//     };
//     var show_sample2 = function(){
//         var s = Snap('#svgMain');
//         s.clear();

//         center_x = 540;
//         center_y = 400;
//         orientation2 = orientation1+pick_cond[3]*Math.pow(-1, Math.floor(Math.random()*2)+1); //rotation
        
//         if(orientation2>=180){
//             orientation2 =orientation2-180;
//         };
//         if(orientation2<0){
//             orientation2 =orientation2+180;
//         };
//         //console.log('ori',orientation1,orientation2)
//         color2 = color1+pick_cond[0]*Math.pow(-1, Math.floor(Math.random()*2)+1);
//          if(color2>=360){
//             color2 =color2-360;
//         };
//         if(color2<0){
//             color2 =color2+360;
//         };
//         //console.log('color',color1,color2)
//         rand_str = orientation2.toString();
//         var str1 = 'R';
//         var str2 = ', 540, 400';
//         var str = str1.concat(rand_str,str2);
//         var x = 540 - 250/2;
//         var y = 400 - 250/2;

//         var r = colorspace[color2][0]/255;
//         var g = colorspace[color2][1]/255;
//         var b = colorspace[color2][2]/255;

//         rand_str = orientation2.toString();
//         var str1 = 'R';
//         var str2 = ', 540, 400';
//         var str = str1.concat(rand_str,str2);

//         var myFilter = '<filter id="colorfilter"><feColorMatrix in="SourceGraphic" type="matrix" color-interpolation-filters="sRGB" values="1 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/></filter>';

//         s.append( Snap.parse(myFilter));
//         convertToTone(r,g,b);
//         f = Snap('#colorfilter');
//         //f = s.filter("url(#colorfilter)");
//         var x = 540 - 250/2;
//         var y = 400 - 250/2;
//         var patch = s.image("/static/images/patch320.png",x,y).attr({filter:f});

//         patch.transform(str);   
//         patch.attr({
//           id:"patch"});

//         //var cueinst2 = s.text(540,600,'Memorize the color').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
//     }; 

//     var show_delay11 = function(){
//         var s = Snap('#svgMain');
//         s.clear();
//         var horizontal = s.line(530,400,550,400);
//         horizontal.attr({
//           id:"fix1",
//           stroke: "white", 
//           strokeWidth:5
//         });
//         var vertical = s.line(540, 390, 540, 410);
//         vertical.attr({
//           id:"fix2",
//           stroke: "white", 
//           strokeWidth:5
//         });
//     };

//     var show_cue1 = function(){
//         var s = Snap('#svgMain');
//         s.clear();
//         cue1 = pick_cond[1]+1;
//         if(cue1==1){
//             target1_color = color1;
//             target1_ori = orientation1;
//         }
//         else{
//             target1_color = color2;
//             target1_ori = orientation2;
//         }
//         var cueinst1 = s.text(540,400,cue1.toString()).attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 3.6,'fontSize':45});
//     };

//     var show_delay12 = function(){
//         var s = Snap('#svgMain');
//         s.clear();
//         var horizontal = s.line(530,400,550,400);
//         horizontal.attr({
//           id:"fix1",
//           stroke: "white", 
//           strokeWidth:5
//         });
//         var vertical = s.line(540, 390, 540, 410);
//         vertical.attr({
//           id:"fix2",
//           stroke: "white", 
//           strokeWidth:5
//         });
//     };

//     var show_probe1 = function(e){
//         document.body.style.cursor = 'auto';
//         blocktype = 2;
//         if (blocktype == 1){
//             s = Snap('#svgMain');
//             s.clear();
//             var probeinst1 = s.text(540,600,'Click around to report the memorized line direction').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
//             var probeinst2 = s.text(540,630,'You may click mutiple times to adjust your answer').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
//             var probeinst3 = s.text(540,660,'Press spacebar to continue.').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});

//             //var probe_ins = s.image("/static/images/ProbeInstruction.png",180,550);
//             probe_fixation();

//             response1_start = new Date().getTime();
//             resp = 0;
//             document.addEventListener("mousedown",getClickPositionOri, false);
//         }
//         else {
//             //show color wheel
//             s = Snap('#svgMain');
//             s.clear();
            
//             show_wheel();
//             document.addEventListener("mousedown",getClickPositionClr, false);
//             response1_start = new Date().getTime();
//             resp = 0;
//         }
//     };

//     var getClickPositionOri = function(evt) {
//         var e = evt.target;
//         var dim = document.getElementById("svgMain").getBoundingClientRect();
//         xPos = evt.clientX-dim.left;
//         yPos = evt.clientY-dim.top;
//         new_x = xPos;
//         new_y = yPos;
//         probe_color = target1_color;
//         show_report();
//         document.addEventListener("keypress", tonext, false);
//     };

//     var getClickPositionClr = function(evt) {
//         var e = evt.target;
//         var dim = document.getElementById("svgMain").getBoundingClientRect();
//         xPos = evt.clientX-dim.left;
//         yPos = evt.clientY-dim.top;
//         new_x = xPos;
//         new_y = yPos;
//         probe_ori = target1_ori;
//         show_report2();
//         document.addEventListener("keypress", tonext, false);
//     };

//     var tonext = function(e){
//         if (e.charCode == 32){
//             wmreport1 = report;
//             rt1 = new Date().getTime() - response1_start;
//             if (blocktype==1){
//                 document.removeEventListener("mousedown",getClickPositionOri, false);
//             }
//             else {
//                 document.removeEventListener("mousedown",getClickPositionClr, false);
//             }
//             document.removeEventListener("keypress",tonext,false);
//             SOA2();  
            
//         };
//     };

//     var SOA2 = function(){
//         var s = Snap('#svgMain');
//         document.body.style.cursor = 'none';
//         s.clear();
//         var horizontal = s.line(530,400,550,400);
//         horizontal.attr({
//           id:"fix1",
//           stroke: "white", 
//           strokeWidth:5
//         });
//         var vertical = s.line(540, 390, 540, 410);
//         vertical.attr({
//           id:"fix2",
//           stroke: "white", 
//           strokeWidth:5
//         });
//         handle8 = setTimeout(function(){
//                 show_cue2()},timesoa2);
//     };

//     var show_cue2 = function(){
//         var s = Snap('#svgMain');
//         s.clear();
//         cue2 = pick_cond[2]+1;
//         if(cue2==1){
//             target2_color = color1;
//             target2_ori = orientation1;
//         }
//         else{
//             target2_color = color2;
//             target2_ori = orientation2;
//         }
//         if(cue2==cue1){
//             cueswitch = 0;
//         }
//         else{
//             cueswitch = 1;
//         }
//         var cueinst2 = s.text(540,400,cue2.toString()).attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 3.6,'fontSize':45});

//         handle9 = setTimeout(function(){
//                 show_delay2()},timecue2);
//     };

//     var show_delay2 = function(){
//         var s = Snap('#svgMain');
//         s.clear();
//         var horizontal = s.line(530,400,550,400);
//         horizontal.attr({
//           id:"fix1",
//           stroke: "white", 
//           strokeWidth:5
//         });
//         var vertical = s.line(540, 390, 540, 410);
//         vertical.attr({
//           id:"fix2",
//           stroke: "white", 
//           strokeWidth:5
//         });
//         handle10 = setTimeout(function(){
//                 show_probe2()},timedelay2);
//     };

//     var show_probe2 = function(e){
//         document.body.style.cursor = 'auto';
//         blocktype = 2;
//         if (blocktype == 1){
//             s = Snap('#svgMain');
//             s.clear();
//             var probeinst1 = s.text(540,600,'Click around to report the memorized line direction').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
//             var probeinst2 = s.text(540,630,'You may click mutiple times to adjust your answer').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
//             var probeinst3 = s.text(540,660,'Press spacebar to continue.').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});

//             //var probe_ins = s.image("/static/images/ProbeInstruction.png",180,550);
//             probe_fixation();

//             response2_start = new Date().getTime();
//             resp = 0;
//             document.addEventListener("mousedown",getClickPositionOri2, false);
//         }
//         else {
//             //show color wheel
//             s = Snap('#svgMain');
//             s.clear();
            
//             show_wheel();
//             document.addEventListener("mousedown",getClickPositionClr2, false);
//             response2_start = new Date().getTime();
//             resp = 0;
//         }
//     };

//     var getClickPositionOri2 = function(evt) {
//         var e = evt.target;
//         var dim = document.getElementById("svgMain").getBoundingClientRect();
//         xPos = evt.clientX-dim.left;
//         yPos = evt.clientY-dim.top;
//         new_x = xPos;
//         new_y = yPos;
//         probe_color = target2_color;
//         show_report();
//         document.addEventListener("keypress", tonext2, false);
//     };

//     var getClickPositionClr2 = function(evt) {
//         var e = evt.target;
//         var dim = document.getElementById("svgMain").getBoundingClientRect();
//         xPos = evt.clientX-dim.left;
//         yPos = evt.clientY-dim.top;
//         new_x = xPos;
//         new_y = yPos;
//         probe_ori = target2_ori;
//         show_report2();
//         document.addEventListener("keypress", tonext2, false);
//     };

//     var tonext2 = function(e){
//         if (e.charCode == 32){
//             wmreport2 = report;
//             //console.log(last_angle/Math.PI*180);
//             rt2 = new Date().getTime() - response2_start;
//             if (blocktype==1){
//                 document.removeEventListener("mousedown",getClickPositionOri2, false);
//             }
//             else {
//                 document.removeEventListener("mousedown",getClickPositionClr2, false);
//             }
//             document.removeEventListener("keypress",tonext2,false);
//             ITI();  
            
//         };
//     };
            
            
//     var ITI = function(e){
//         var s = Snap('#svgMain');
//         s.clear();
//         if(practice !== 1){
//             psiTurk.recordTrialData({'phase':"TEST",
//                 'color1':color1,
//                 'color2':color2,
//                 'ori1':orientation1,
//                 'ori2':orientation2,
//                 'clrdiff':pick_cond[0],
//                 'ori_diff':pick_cond[3],
//                 'cue1':cue1,
//                 'tgt1_clr':target1_color,
//                 'tgt1_ori':target1_ori,
//                 'cue2':cue2,
//                 'cueswitch':cueswitch,
//                 'tgt2_clr':target2_color,
//                 'tgt2_ori':target2_ori,
//                 'trial': trial_count,
//                 'wmreport1':wmreport1,
//                 'wmreport2':wmreport2,
//                 'RT1':rt1,
//                 'RT2': rt2,
//             });
//         }
//         trial_count ++;
//         //console.log(color1,color2,wmreport1,wmreport2,target1_color,target2_color);
//         handle11 = setTimeout(function(){
//                 ifbreak()},500);
//     };

    // var ifbreak = function(){
    //     clearTimeout(handle11);
    //     if (trial_count % 40 == 0 && trial_count != 160){
    //         var s = Snap('#svgMain');
    //         s.clear();
    //         var blocknum = trial_count/40;
    //         var progress = 4-blocknum;
    //         var str1 = progress.toString();
    //         var str2 = " out of 4 blocks left for the entire experiment. Press spacebar to continue";
    //         var info = str1.concat(str2);

    //         var infotext = s.text(500,320,info).attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
    //         var infotext2 = s.text(500,300,"You are doing great! Please take a break.").attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});

    //         document.addEventListener("keypress",nextblock,false);

    //         //blocktype = blockorder.shift();
    //     }
    //     else{
    //         trialend = new Date().getTime();
    //         trialtime = trialend-trialstart;
    //         console.log(trialtime)
    //         next();
    //     };
    // };

    // var nextblock = function(e){
    //     if (e.keyCode == 32){
    //         document.removeEventListener("keypress",nextblock,false);
    //         next();
    //     }
    // };  
//     // Load the stage.html snippet into the body of the page
//     psiTurk.showPage('stage.html');

//     // Register the response handler that is defined above to handle any
//     // key down events.
//     //$("body").focus().keydown(response_handler); 

//     // Start the test
    
//     next();
// };


/****************
* Questionnaire *
****************/

var Questionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);		
		});
		$('input').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);		
		});
	};

	prompt_resubmit = function() {
		document.body.innerHTML = error_message;
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		document.body.innerHTML = "<h1>Trying to resubmit...</h1>";
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                //psiTurk.computeBonus('compute_bonus', function(){finish()}); 
                finish();
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire.html');
	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});
	
	$("#next").click(function () {
	    record_responses();
	    psiTurk.saveData({
            success: function(){
                //psiTurk.computeBonus('compute_bonus', function() { 
                	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                //}); 
            }, 
            error: prompt_resubmit});
	});
    
	
};

// Task object to keep track of the current phase
var currentview;
/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function(){

                currentview = new Practice1();

        }
    )  
});

/*******************
 * Functions
 ******************/
// function convertToTone(r,g,b) {
//       var matrix = document.querySelector('feColorMatrix');
//       var value = [];
//       value = value.concat(
//       [r, 0, 0, 0,0]);
//       value = value.concat(
//       [0, g, 0, 0,0]);
//       value = value.concat(
//       [0, 0, b, 0,0]);
//       value = value.concat([0, 0, 0, 1, 0]);
//       matrix.setAttribute('values', value.join(' '));
//     };

function toRadians (angle) {
    return angle * (Math.PI / 180);
    }


var probe_fixation = function(){
    var horizontal = s.line(530,400,550,400);
    horizontal.attr({
      id:"fix1",
      stroke: "white", 
      strokeWidth:5
    });
    var vertical = s.line(540, 390, 540, 410);
    vertical.attr({
      id:"fix2",
      stroke: "white", 
      strokeWidth:5
    });

    testc=pick_cond[3];
    if (testc==1){
        testloc=location3;
    } else{
        testloc=pmiloc;
    }
    var theta=locset[testloc];
    testxloc=radius*Math.cos(toRadians(theta-90))+540
    testyloc=radius*Math.sin(toRadians(theta-90))+400

    orientation3 = Math.floor(Math.random()*180); //rotation
    rand_str = orientation3.toString();
    // var testxlocation=testxloc.toString();
    // var testylocation=testyloc.toString();
    
    var testprobe = s.circle(testxloc,testyloc,circledia/2) //r=70
    testprobe.attr({
        'fill': 'white', 'fill-opacity': 0,'stroke': 'white','stroke-width': 2
    });
    var fixatedot = s.circle(testxloc, testyloc, 7);
    fixatedot.attr({ 
        fill: "red"
    });
}

var de_probe_fixation = function(){
        
    var testprobe = s.circle(540,400,circledia/2) //r=70
    testprobe.attr({
        'fill': 'white', 'fill-opacity': 0,'stroke': 'white','stroke-width': 2
    });
    var fixatedot = s.circle(540, 400, 7);
    fixatedot.attr({ 
        fill: "red"
    });
}
var show_report = function(){//orientation continous report 
    
    if (xPos>testxloc){
        side = 1;
        deg = Math.PI/2 + Math.atan((yPos-testyloc)/(xPos-testxloc));
    };
    if (xPos<testxloc){
        side = 2;
        deg = 1.5*Math.PI + Math.atan((yPos-testyloc)/(xPos-testxloc));
    };
    if (xPos == testxloc){
        deg = 0;
    };

    if (deg > Math.PI){
        deg = deg - Math.PI;
    }
    new_deg = deg;
    if (document.getElementById("patch") !== null){
        document.getElementById("patch").remove();
    };
    if (document.getElementById("colorfilter") !== null){
        document.getElementById("colorfilter").remove();
    };
    report = Math.floor(new_deg/Math.PI*180);
    //console.log(rotate);

    rand_str = report.toString();
    var testxlocation=testxloc.toString();
    var testylocation=testyloc.toString();
    var str1 = 'R';
    var reportstr = str1.concat(rand_str,',',testxlocation,',',testylocation);

    if ( $("#reportline").length > 0 ) {
        reportline.transform(reportstr); 
    } else {
        reportline = s.line(testxloc,testyloc-circledia/2,testxloc,testyloc+circledia/2);
        reportline.transform(reportstr); } 

    reportline.attr({
        id:"reportline",
        stroke: "white", 
        strokeWidth:2
    });

    
    var down_x, down_y, last_angle;
}

var de_show_report = function(){//orientation continous report 
    
    if (xPos>540){
        side = 1;
        deg = Math.PI/2 + Math.atan((yPos-400)/(xPos-540));
    };
    if (xPos<540){
        side = 2;
        deg = 1.5*Math.PI + Math.atan((yPos-400)/(xPos-540));
    };
    if (xPos == 540){
        deg = 0;
    };

    if (deg > Math.PI){
        deg = deg - Math.PI;
    }
    new_deg = deg;
    if (document.getElementById("patch") !== null){
        document.getElementById("patch").remove();
    };
    if (document.getElementById("colorfilter") !== null){
        document.getElementById("colorfilter").remove();
    };
    de_report = Math.floor(new_deg/Math.PI*180);
    //console.log(rotate);

    rand_str = de_report.toString();
    var str1 = 'R';
    var reportstr = str1.concat(rand_str,',','540',',','400');

    if ( $("#reportline").length > 0 ) {
        reportline.transform(reportstr); 
    } else {
        reportline = s.line(540,400-circledia/2,540,400+circledia/2);
        reportline.transform(reportstr); } 

    reportline.attr({
        id:"reportline",
        stroke: "white", 
        strokeWidth:2
    });
}

var show_wheel = function(){//show color wheel during report
    var clrwheel = s.image("/static/images/colorwheel.png",212.8,72.8, 654.4,654.4);
    //var probe_ins = s.image("/static/images/ProbeInstruction.png",150,740,800,60);
    randr = Math.floor(Math.random() * 360);
    rand_str = randr.toString();
    var str1 = 'R';
    var str2 = ', 540, 400';
    var str = str1.concat(rand_str,str2);
    clrwheel.transform(str);

    if (practice==1){
        var probeinst1 = s.text(540,750,'Click on the wheel to report the memorized color.').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});
        var probeinst2 = s.text(540,775,'You may click mutiple times to adjust your answer.  Press spacebar to continue.').attr({'fill' : 'white',  'stroke': 'white', 'stroke-width': 0.6});

    }
    
}

var show_report2 = function(){//color continous report 
    if (xPos>540){
        side = 1;
        deg = Math.PI/2 + Math.atan((yPos-400)/(xPos-540));
    };
    if (xPos<540){
        side = 2;
        deg = 1.5*Math.PI + Math.atan((yPos-400)/(xPos-540));
    };
    if (xPos == 540){
        if (yPos <= 400){
            side = 3;
            deg = 0;
            var coordinates = [540, 72.8, 540, 95.8];
        };
        if (yPos > 400){
            side = 4;
            deg = Math.PI;
            var coordinates = [540, 727.2, 540, 800];
        };
    };
    
    new_deg = deg;
    actual_deg = deg;

    rand_rotate = randr/180*Math.PI;
    actual_deg = actual_deg - rand_rotate;
    if (actual_deg < 0){
            actual_deg = actual_deg + 2* Math.PI;
        };
    report = actual_deg;

    if (document.getElementById("patch") !== null){
        document.getElementById("patch").remove();
    };
    if (document.getElementById("colorfilter") !== null){
        document.getElementById("colorfilter").remove();
    };
    if (document.getElementById("circle") !== null){
        document.getElementById("circle").remove();
    };
    report = Math.floor(actual_deg/Math.PI*180);

    var r = colorspace[report][0]/255;
    var g = colorspace[report][1]/255;
    var b = colorspace[report][2]/255;

    rand_str = probe_ori.toString();
    var str1 = 'R';
    var str2 = ', 540, 400';
    var str = str1.concat(rand_str,str2);

    var myFilter = '<filter id="colorfilter"><feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="1 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/></filter>';

    s.append( Snap.parse(myFilter) );
    convertToTone(r,g,b);
    f = Snap('#colorfilter');
    var x = 540 - 250/2;
    var y = 400 - 250/2;
    var patch = s.image("/static/images/patch320.png",x,y).attr({filter:f});
    patch.transform(str);   
    patch.attr({
      id:"patch"});
    var down_x, down_y, last_angle;
};





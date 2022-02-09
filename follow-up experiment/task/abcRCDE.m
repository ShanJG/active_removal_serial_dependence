function abcRCDE(subName, condition, CurRun, havepractice)

try
    
    close all;
    %    clear all;
    clear mex;
    IOPort('Closeall');
    Screen('Closeall');
    
    %test script
    Screen('Preference', 'SkipSyncTests', 1);
    rand('twister',sum(100*clock));
    
    if length(subName) < 1; subName = 'tmp'; end;
    
    if condition==0  % no overlap, low conflict
        filename=[subName '_Removal_low_' num2str(CurRun)];
    elseif condition==1  %overlap, high conflict
        filename=[subName '_Removal_high_' num2str(CurRun)];
    end
    
    screenid = max(Screen('Screens'));
    [win,rect] = Screen('OpenWindow',screenid);
    HideCursor;
    
    Screen('TextFont', win, 'Arial');
    
    HideCursor;
    
    %%parameters
    nloc=6;
    trialnumber=50;      % 50trials/blck   4blocks/session 3sessions
    resttrials=25;           % 1 break/block
    if havepractice==1
        practice_num=6;
    else
        practice_num=0;
    end
    paddingtime=4;
    
    white=255;
    black=0;
    gray=(white+black)/2;
    
    %key buttons
    KbName('UnifyKeyNames');
    yes_button=KbName('1!');
    no_button=KbName('2@');
    
    spatial_frequency=1;
    radius=3;
    thinthickness=0.08;
    
    Fix_dur=0.75;
    sample_dur1=1; %A and B
    delay1=1.5;
    rtcue_dur=0.75;
    delay2=2.25;
    sample_dur2=0.5;
    delay3=2;
    response_interval=4;
    %recall within response_interval
    inner_interval=1.25;
    %Fixation_dur
    sample_dur3=0.75;
    delay4=2.25;
    %recall within response_interval
    intertrial_interval=2;
    
    feedbacktime=1; %only during practice
    
   
    contrast=0.6;
    devicenumber=[];
    
    ifi = Screen('GetFlipInterval', win);
    
    
    %Brodgen mac Room B&C
    Distance=57;%cm
    ScreenWidth=46;%cm
    ScreenHeight=27;%cm
    
    
    %Resolution_IBP=[1200,1920];
    Resolution_IBP=[rect(3), rect(4)];
    PixelSize_IBP=ScreenWidth/Resolution_IBP(2);
    degree_meter_IBP=2*Distance*tand(1/2);
    pixel_per_degree=degree_meter_IBP/PixelSize_IBP;
    disp(pixel_per_degree)
    radius_in_pixel = round(radius * pixel_per_degree);
    thinthickness_in_pixel = round(thinthickness * pixel_per_degree);
    disp(thinthickness_in_pixel)
    spatial_frequency_in_pixel = spatial_frequency / pixel_per_degree;
    
    size_in_pixel = 2 * radius * pixel_per_degree;
    
    xc = rect(3)/2;
    yc = rect(4)/2;
    
    width = Resolution_IBP(1);
    height = Resolution_IBP(1);
    
    %Eccentricity
    Eccentricity_degree=8;
    Eccentricity_meter_IBP=2*Distance*tand(Eccentricity_degree/2);
    Eccentricity_pixel=Eccentricity_meter_IBP/PixelSize_IBP;
    Offset_peri=round(Eccentricity_pixel);
    
    %% Creating Stim
    gr_backgroundColorOffset = [0.5,0.5,0.5,0];
    
    modulateColor=[];
    
    [grating,gratingrect] = CreateProceduralSineGrating(win, width, height, gr_backgroundColorOffset, radius_in_pixel, 1);
    

    
    %% define position shift angle (theta)
    theta=[300 0 60 120 180 240]./180*pi; %corresponding to [30 90 300 120 270 210] in the manuscript
                         %X positive is down
                         %Y postive is right.
                                                                      
                               
    
    for iloc=1:nloc
        grating_posrect{iloc}=CenterRectOnPoint(gratingrect, xc+Offset_peri*cos(theta(iloc)), yc+Offset_peri*sin(theta(iloc)));
    end
    grating_posrect_center=CenterRectOnPoint(gratingrect, xc, yc);
    wheelrect=CenterRect([0,0,2*radius_in_pixel,2*radius_in_pixel],rect);
    for iloc=1:nloc
        wheel_posrect{iloc}=CenterRectOnPoint(wheelrect, xc+Offset_peri*cos(theta(iloc)), yc+Offset_peri*sin(theta(iloc)));
    end
    wheel_posrect_center=CenterRectOnPoint(wheelrect, xc, yc);
    FixationRect=CenterRect([0,0,12,12],rect);
    FixationRect=OffsetRect(FixationRect,0,0);
    

    if CurRun==1 % create stim sequence
        trialcond = [];
        ori_a=randsample(180,300,true); 
        ori_b=randsample(180,300,true); 
        ori_c=randsample(180,300,true); 
        ori_abc= [ori_a,ori_b,ori_c];
        probe_cue=repmat([1 3],1,150); %1 for report A, 3 for report C
        probe_cue=Shuffle(probe_cue).';
        ori_de=randsample(180,300,true); 
    
        for nrep = 1:length(ori_abc)
            if condition==0
                loc_abc = randsample(6,3).';
            elseif condition==1
                loc_ab = randsample(6,2).';
                %loc_ab=[1 2]; %%%%
                loc_c = loc_ab(2);
                loc_abc = [loc_ab loc_c];
            end
            if probe_cue(nrep)==1
                loc_probed=loc_abc(1);
                ori_probed=ori_abc(nrep,1);
            elseif probe_cue(nrep)==3
                loc_probed=loc_abc(3);
                ori_probed=ori_abc(nrep,3);
            end
        
            trialcond = [trialcond;[ori_abc(nrep,1),ori_abc(nrep,2),ori_abc(nrep,3),loc_abc(1),loc_abc(2),loc_abc(3),probe_cue(nrep),loc_probed,ori_probed,ori_de(nrep)]];
        end
        trialcond = Shuffle(trialcond,2);
        
        prct_cond = [];
        prct_ori_a=randsample(180,practice_num,true); % 8 practice per condition use everytime
        prct_ori_b=randsample(180,practice_num,true); 
        prct_ori_c=randsample(180,practice_num,true); 
        prct_ori_abc= [prct_ori_a,prct_ori_b,prct_ori_c];
        prct_probe_cue=repmat([1 3],1,practice_num/2); 
        prct_probe_cue=Shuffle(prct_probe_cue).';
        prct_ori_de=randsample(180,8,true); 
    
        for nrep = 1:length(prct_ori_abc)
            if condition==0
                prct_loc_abc = randsample(6,3).';
            elseif condition==1
                prct_loc_ab = randsample(6,2).';
                %loc_ab=[1 2]; %%%%
                prct_loc_c = prct_loc_ab(2);
                prct_loc_abc = [prct_loc_ab prct_loc_c];
            end
            if prct_probe_cue(nrep)==1
                prct_loc_probed=prct_loc_abc(1);
                prct_ori_probed=prct_ori_abc(nrep,1);
            elseif prct_probe_cue(nrep)==3
                prct_loc_probed=prct_loc_abc(3);
                prct_ori_probed=prct_ori_abc(nrep,3);
            end
        
            prct_cond = [prct_cond;[prct_ori_abc(nrep,1),prct_ori_abc(nrep,2),prct_ori_abc(nrep,3),prct_loc_abc(1),prct_loc_abc(2),prct_loc_abc(3),...
                prct_probe_cue(nrep),prct_loc_probed,prct_ori_probed,prct_ori_de(nrep)]];
        end
        prct_cond = Shuffle(prct_cond,2);
        save(['parameters_ovlp' int2str(condition) '_' subName '.mat'],'trialcond','prct_cond');
    else
        load(['parameters_ovlp' int2str(condition) '_' subName '.mat']); 
    end
    current_cond=trialcond(trialnumber*(CurRun-1)+1:trialnumber*CurRun,:);
    if havepractice==1
        current_cond=[prct_cond;current_cond];
    end
    orientation_a=current_cond(:,1)';
    orientation_b=current_cond(:,2)';
    orientation_c=current_cond(:,3)';
    loc_a = current_cond(:,4)';
    loc_b = current_cond(:,5)';
    loc_c = current_cond(:,6)';
    cue_probe=current_cond(:,7)';
    loc_probed=current_cond(:,8)';
    ori_probed=current_cond(:,9)';
    ori_de=current_cond(:,10)';
    
    
    test_jitter=randsample(90,trialnumber+practice_num,true)-1;
    
    for i=1:(trialnumber+practice_num)
        testjitter_orientation(i)=round((-1)^(round(rand))*test_jitter(i));
        testjitter_orientation_de(i)=round((-1)^(round(rand))*test_jitter(i));
    end
    
    Screen('TextSize',win,48);
    if condition==0
        instructions=['In this run the third item will always appear at a new location.\n\n Press any button to start.'];
    elseif condition==1
        instructions=['In this run the third item will always appear at the same location as the useless one.\n\n Press any button to start.'];
    end
    instructions=WrapString(instructions,40);
    Screen(win, 'FillRect', gray);
    Screen('FillOval', win, white, FixationRect);
    DrawFormattedText(win, instructions, 'center', 'center', black);
    Screen('Flip',win);
    
    RestrictKeysForKbCheck([])
    KbWait(-1);
    activeKeys = [KbName('p') KbName('ESCAPE') KbName('LeftGUI')];
    RestrictKeysForKbCheck(activeKeys)
    
    
    t0=GetSecs;
    
    HideCursor;
    Screen(win, 'FillRect', gray);
    Screen('FillOval', win, white, FixationRect);
    Screen('Flip',win);
    WaitSecs(paddingtime);
    
    %record %1-orientation_target %2-orientation_ntarget %3-ITI %4-cue_order
    %5-cue_switch %6-remembered_orientation1(after_jitter)
    %7-remembered_orientation2 %8-samplejitter_ori %9-testjitter_ori1
    %9-testjitter_ori2 %10-test_orientation1 %11-testjitter_ori2
    %12-test_ori2 %13-response_ori1 %14-gotresp1 %15-resp1RT 
    %16-response_ori2 %17-gotresp2 %18-resp2RT %19-angle_diff1
    %20-angle_diff2 %21- %22- %23-performance1(1:<15, -1:<30,-99:>30deg)
    %24-performance %25-sample_ori1_convt %26-sample_ori2_convt
    %27-loc_target %28-loc_ntarget %29-ori_distance %30-loc_distance
    record = struct;
    for i=1:(trialnumber+practice_num)
        if practice_num~=0
            record.practice=[ones(1,practice_num),zeros(1,trialnumber)];
        else
            record.practice=zeros(1,trialnumber);
        end
        if condition==1
            record.condition=ones(1,trialnumber+practice_num);
        elseif condition==0
            record.condition=zeros(1,trialnumber+practice_num);
        end
        record.ori_a=orientation_a;
        record.ori_b=orientation_b;
        record.ori_c=orientation_c;
        record.cue_probe=cue_probe;
        record.loc_a=loc_a;
        record.loc_b=loc_b;
        record.loc_c=loc_c;
        record.ori_de=ori_de;
        if cue_probe(i)==1
            ori_to_report=orientation_a(i);
            record.ori_to_report(i)=orientation_a(i);
        elseif cue_probe(i)==3
            ori_to_report=orientation_c(i);
            record.ori_to_report(i)=orientation_c(i);
        end
        ori_to_report_de=ori_de(i);
        
        remembered_orientation1=orientation_a(i);
        remembered_orientation2=orientation_b(i);
        remembered_orientation3=orientation_c(i);
        remembered_orientation_de=ori_de(i);
        
        test_orientation=ori_to_report+testjitter_orientation(i);
        test_orientation_de=ori_to_report_de+testjitter_orientation_de(i);
        
        record.testjitter_ori(i)=testjitter_orientation(i);
        record.test_ori(i)=test_orientation;
        record.testjitter_ori_de(i)=testjitter_orientation_de(i);
        record.test_ori_de(i)=test_orientation_de;
        
       
        Screen(win, 'FillRect', gray);
        Screen('FillOval', win, white, FixationRect); 
        Screen('Flip',win);
        WaitSecs(Fix_dur);
        
        Screen(win, 'FillRect', gray);
        Screen('DrawTexture', win, grating, gratingrect, grating_posrect{loc_a(i)}, remembered_orientation1, [], [], modulateColor, [], [], [180*rand(1)+180, spatial_frequency_in_pixel, contrast, 0]);
        Screen('DrawTexture', win, grating, gratingrect, grating_posrect{loc_b(i)}, remembered_orientation2, [], [], modulateColor, [], [], [180*rand(1)+180, spatial_frequency_in_pixel, contrast, 0]);
        
        Screen('FillOval', win, white, FixationRect); 
        Screen('Flip',win);
        WaitSecs(sample_dur1);
        %sec8_5 = GetSecs-t0
        
        Screen(win, 'FillRect', gray);
        Screen('FillOval', win, white, FixationRect);
        Screen('Flip',win);
        WaitSecs(delay1);
        %sec9_5 = GetSecs-t0
        
        Screen(win, 'FillRect', gray);
        Screen('FillOval', win, white, FixationRect);
        Screen('FrameOval', win, white, wheel_posrect{loc_a(i)}, thinthickness_in_pixel); %%to be tested
        Screen('Flip',win);
        WaitSecs(rtcue_dur)
        
        Screen(win, 'FillRect', gray);
        Screen('FillOval', win, white, FixationRect);
        Screen('Flip',win);
        WaitSecs(delay2)
        
        
        Screen(win, 'FillRect', gray);
        Screen('DrawTexture', win, grating, gratingrect, grating_posrect{loc_c(i)}, remembered_orientation3, [], [], modulateColor, [], [], [180*rand(1)+180, spatial_frequency_in_pixel, contrast, 0]);
        
        Screen('FillOval', win, white, FixationRect);
        Screen('Flip',win);
        WaitSecs(sample_dur2);
        %sec10 = GetSecs-t0
        
        Screen(win, 'FillRect', gray);
        Screen('FillOval', win, white, FixationRect);
        Screen('Flip',win);
        WaitSecs(delay3);
        %sec18 = GetSecs-t0
     
        
        t1=GetSecs;
        gotResponse = 0;
        test_theta = test_orientation*pi/180;
        
        xwheel=round(xc+Offset_peri*cos(theta(loc_probed(i))));
        ywheel=round(yc+Offset_peri*sin(theta(loc_probed(i))));
        current_frame = 0;
        %SetMouse(xwheel,ywheel,win);        
        ShowCursor('Arrow');  
        %SetMouse(xc,yc,win);
        SetMouse(round(cos(test_theta)*radius_in_pixel+xwheel), round(-sin(test_theta)*radius_in_pixel+ywheel),win);
        Screen('FrameOval', win, black, wheel_posrect{loc_probed(i)}, thinthickness_in_pixel);
        Screen('DrawLine', win, black, -cos(test_theta)*radius_in_pixel+xwheel, sin(test_theta)*radius_in_pixel+ywheel, ...
            cos(test_theta)*radius_in_pixel+xwheel, -sin(test_theta)*radius_in_pixel+ywheel, thinthickness_in_pixel);
        Screen('Flip', win);
        tstart=GetSecs;
        while (GetSecs-tstart)<response_interval
            if gotResponse == 0
                [xPos, yPos, buttons] = GetMouse(win);
                test_theta=atan2((ywheel-yPos),(xPos-xwheel)); %Start from rightward axis and rotate counterclockwise. i.e. angular coordinate.
                
                if (xPos > (.99*(xc*2))) || (xPos < (.01*(xc*2)))||(yPos > (.99*(yc*2))) || (yPos < (.01*(yc*2)))
                    SetMouse(round(cos(test_theta)*radius_in_pixel+xwheel), round(-sin(test_theta)*radius_in_pixel+ywheel),win);
                end
            end
            
            if any(buttons)
                gotResponse = 1;
                timeoutDir = nan;
                record.gotResp1(i) = 1;
                record.gotResp12(i) = nan;
                if current_frame ==0
                    record.RT1(i) = GetSecs - t1;
                end
                current_frame=current_frame+1;
            else
                gotResponse = 0;
                timeoutDir = 1;
                record.gotResp1(i) = 0;
                record.gotResp12(i) = 1;
                record.RT1(i) = GetSecs - t1;
            end
                        
            response_orientation = test_theta;
            
            record.ori_resp(i) = response_orientation*180/pi;
            
            % Calculate RespError
            
           %%
            if mod(ori_to_report,180)>90
                ori_to_report_convt=270-ori_to_report;
            else
                ori_to_report_convt=90-ori_to_report;      %converted to start with rightward axis and rotate counterclockwise. i.e. angular coordinate 
            end
            
            record.ori_to_report_convt(i)=ori_to_report_convt;
            
            angle_diff=ori_to_report_convt-mod(response_orientation*180/pi,180);
            
            if angle_diff>90
                angle_diff=180-angle_diff;
            elseif angle_diff<-90
                angle_diff=angle_diff+180;
            end
            
            record.angle_diff(i)=angle_diff;
            
            if gotResponse == 1
                if abs(angle_diff) < 15
                    record.resp1_good(i) = 1;
                    text1 = [num2str(abs(round(angle_diff))) ' degrees off'];
                    %text1='Good!';
                elseif abs(angle_diff) < 30
                    record.resp1_good(i) = -1;
                    text1 = [num2str(abs(round(angle_diff))) ' degrees off'];
                    %text1='OK!';
                else
                    record.resp1_good(i) = -99;
                    text1 = [num2str(abs(round(angle_diff))) ' degrees off'];
                    %text1='Poor!';
                end
            else
                record.resp1_good(i) = nan;
                text1='No Response!';
            end
            
            Screen('FrameOval', win, black, wheel_posrect{loc_probed(i)}, thinthickness_in_pixel);
            if gotResponse == 0
                Screen('DrawLine', win, black, -cos(test_theta)*radius_in_pixel+xwheel, sin(test_theta)*radius_in_pixel+ywheel, ...
                    cos(test_theta)*radius_in_pixel+xwheel, -sin(test_theta)*radius_in_pixel+ywheel, thinthickness_in_pixel);
            else
                Screen('DrawLine', win, black, -cos(test_theta)*radius_in_pixel+xwheel, sin(test_theta)*radius_in_pixel+ywheel, ...
                    cos(test_theta)*radius_in_pixel+xwheel, -sin(test_theta)*radius_in_pixel+ywheel, thinthickness_in_pixel*2);
                HideCursor;
            end
            Screen('FillOval', win, white, FixationRect);
            Screen('Flip', win);
         
        end
        HideCursor;
        
        if i<=practice_num
            feedbacktext=['You are: ' text1 ];
            feedbacktext=WrapString(feedbacktext,100);
            Screen(win, 'FillRect', gray);
            DrawFormattedText(win, feedbacktext, 'center', 'center', black);
            Screen('Flip',win);
            WaitSecs(feedbacktime);
        end
        
        %% delayed estimation
        Screen(win, 'FillRect', gray);
        Screen('Flip',win);
        WaitSecs(inner_interval);
        
        Screen(win, 'FillRect', gray);
        Screen('FillOval', win, white, FixationRect); 
        Screen('Flip',win);
        WaitSecs(Fix_dur);
        
        Screen(win, 'FillRect', gray);
        Screen('DrawTexture', win, grating, gratingrect, grating_posrect_center, remembered_orientation_de, [], [], modulateColor, [], [], [180*rand(1)+180, spatial_frequency_in_pixel, contrast, 0]);
      
        Screen('Flip',win);
        WaitSecs(sample_dur3);
        %sec8_5 = GetSecs-t0
        
        Screen(win, 'FillRect', gray);
        Screen('FillOval', win, white, FixationRect);
        Screen('Flip',win);
        WaitSecs(delay4);
        
        t2=GetSecs;
        gotResponse = 0;
        test_theta_de = test_orientation_de*pi/180;
        
        xwheel=round(xc);
        ywheel=round(yc);
        current_frame = 0;
        %SetMouse(xwheel,ywheel,win);        
        ShowCursor('Arrow');  
        %SetMouse(xc,yc,win);
        SetMouse(round(cos(test_theta_de)*radius_in_pixel+xwheel), round(-sin(test_theta_de)*radius_in_pixel+ywheel),win);
        Screen('FrameOval', win, black, wheel_posrect_center, thinthickness_in_pixel);
        Screen('DrawLine', win, black, -cos(test_theta_de)*radius_in_pixel+xwheel, sin(test_theta_de)*radius_in_pixel+ywheel, ...
            cos(test_theta_de)*radius_in_pixel+xwheel, -sin(test_theta_de)*radius_in_pixel+ywheel, thinthickness_in_pixel);
        Screen('Flip', win);
        tstart=GetSecs;
        while (GetSecs-tstart)<response_interval
            if gotResponse == 0
                [xPos, yPos, buttons] = GetMouse(win);
                test_theta_de=atan2((ywheel-yPos),(xPos-xwheel));
                
                if (xPos > (.99*(xc*2))) || (xPos < (.01*(xc*2)))||(yPos > (.99*(yc*2))) || (yPos < (.01*(yc*2)))
                    SetMouse(round(cos(test_theta_de)*radius_in_pixel+xwheel), round(-sin(test_theta_de)*radius_in_pixel+ywheel),win);
                end
            end
            
            if any(buttons)
                gotResponse = 1;
                timeoutDir = nan;
                record.gotResp_de1(i) = 1;
                record.gotResp_de12(i) = nan;
                if current_frame ==0
                    record.RT_de(i) = GetSecs - t2;
                end
                current_frame=current_frame+1;
            else
                gotResponse = 0;
                timeoutDir = 1;
                record.gotResp_de1(i) = 0;
                record.gotResp_de12(i) = 1;
                record.RT_de(i) = GetSecs - t2;
            end
                        
            response_orientation_de = test_theta_de;
            
            record.ori_resp_de(i) = response_orientation_de*180/pi;
            
           
            if mod(ori_to_report_de,180)>90
                ori_to_report_de_convt=270-ori_to_report_de;
            else
                ori_to_report_de_convt=90-ori_to_report_de;
            end
            
            record.ori_to_report_de_convt(i)=ori_to_report_de_convt;
            
            angle_diff_de=ori_to_report_de_convt-mod(response_orientation_de*180/pi,180);
            
            if angle_diff_de>90
                angle_diff_de=180-angle_diff_de;
            elseif angle_diff_de<-90
                angle_diff_de=angle_diff_de+180;
            end
            
            record.angle_diff_de(i)=angle_diff_de;
            
            if gotResponse == 1
                if abs(angle_diff_de) < 15
                    record.resp_de_good(i) = 1;
                    text2 = [num2str(abs(round(angle_diff_de))) ' degrees off'];
                    %text1='Good!';
                elseif abs(angle_diff_de) < 30
                    record.resp_de_good(i) = -1;
                    text2 = [num2str(abs(round(angle_diff_de))) ' degrees off'];
                    %text1='OK!';
                else
                    record.resp_de_good(i) = -99;
                    text2 = [num2str(abs(round(angle_diff_de))) ' degrees off'];
                    %text1='Poor!';
                end
            else
                record.resp_de_good(i) = nan;
                text2='No Response!';
            end
            
            Screen('FrameOval', win, black, wheel_posrect_center, thinthickness_in_pixel);
            if gotResponse == 0
                Screen('DrawLine', win, black, -cos(test_theta_de)*radius_in_pixel+xwheel, sin(test_theta_de)*radius_in_pixel+ywheel, ...
                    cos(test_theta_de)*radius_in_pixel+xwheel, -sin(test_theta_de)*radius_in_pixel+ywheel, thinthickness_in_pixel);
            else
                Screen('DrawLine', win, black, -cos(test_theta_de)*radius_in_pixel+xwheel, sin(test_theta_de)*radius_in_pixel+ywheel, ...
                    cos(test_theta_de)*radius_in_pixel+xwheel, -sin(test_theta_de)*radius_in_pixel+ywheel, thinthickness_in_pixel*2);
                HideCursor;
            end
            Screen('FillOval', win, white, FixationRect);
            Screen('Flip', win);
         
        end
        HideCursor;
        
        %% end of trial
        Screen(win, 'FillRect', gray);
%         Screen('FillOval', win, white, FixationRect);
        Screen('Flip',win);
        if i<=practice_num
            feedbacktext=['You are: ' text2 ];
            feedbacktext=WrapString(feedbacktext,100);
            Screen(win, 'FillRect', gray);
            DrawFormattedText(win, feedbacktext, 'center', 'center', black);
            Screen('Flip',win);
            WaitSecs(feedbacktime);
        end
        
        WaitSecs(intertrial_interval);
        
        
        
        if i==practice_num
            begintext='The practice is over. Have you got the rules? \n If you do not have any question, please press "P" to start the experiment.';
            Screen('TextSize',win,48);
            begintext=WrapString(begintext,40);
            Screen(win, 'FillRect', gray);
            DrawFormattedText(win, begintext, 'center', 'center', black);
            Screen('Flip',win);
            [secs, keyCode]=KbWait(-1);
            escKeys = KbName('ESCAPE');
            if any(keyCode(escKeys))
                WeHaveRun=i
                Screen('CloseAll');
                IOPort('CloseAll');
                ShowCursor;
            end
            Screen(win, 'FillRect', gray);
            Screen('Flip',win);
            WaitSecs(intertrial_interval);
                
        elseif mod(i-practice_num,resttrials)==0 && i~=trialnumber+practice_num
            resttext='You can take a break now! When you are ready to continue, please press "P" to start the experiment.';
            Screen('TextSize',win,48);
            resttext=WrapString(resttext,40);
            Screen(win, 'FillRect', gray);
            DrawFormattedText(win, resttext, 'center', 'center', black);
            Screen('Flip',win);
            [secs, keyCode]=KbWait(-1);
            escKeys = KbName('ESCAPE');
            if any(keyCode(escKeys))
                WeHaveRun=i
                Screen('CloseAll');
                IOPort('CloseAll');
                ShowCursor;
            end
            Screen(win, 'FillRect', gray);
            Screen('FillOval', win, white, FixationRect);
            Screen('Flip',win);
            tstart=GetSecs;
            WaitSecs(intertrial_interval);
        end
        
    end
    
    mean_error=sum(abs(record.angle_diff))/(trialnumber+practice_num);
    mean_error_de=sum(abs(record.angle_diff_de))/(trialnumber+practice_num);
    try
        save(filename,'record','mean_error','loc_probed','ori_probed','loc_a','loc_b','loc_b','orientation_a','orientation_b','orientation_c','ori_de','mean_error_de');
    catch
    end
    %save(['record' subName '.mat'],'record','mean_error1','mean_error2','mean_error','loc_target','loc_ntarget','orientation_target','orientation_ntarget');

    feed1text=[num2str(abs(round(mean_error))) ' degrees off'];
    feed2text=[num2str(abs(round(mean_error_de))) ' degrees off'];
    
    feedbacktext=['Your overall performance for this block is: \n\n In 3-item trials, you are: ' feed1text '\n In 1-item trials, you are: ' feed2text];
    feedbacktext=WrapString(feedbacktext,150);
    Screen(win, 'FillRect', gray);
    DrawFormattedText(win, feedbacktext, 'center', 'center', black);
    Screen('Flip',win);
    WaitSecs(6);
    
    Screen('CloseAll');
    IOPort('CloseAll');
    ShowCursor;
    
catch
    %this "catch" section executes in case of an error in the "try" section
    %above.  Importantly, it closes the onscreen window if its open.
    Screen('CloseAll');
    Priority(0); %Usage: oldPriority=Priority([newPriority])
    psychrethrow(psychlasterror); %same as 'rethrow': reissure error; rethrow(err),usually used in 'try-catch' statement
    
end %try..catch..

end




## Hack Attenders

### Problem statement: 

<p>
With the onset of pandemic era many institution started following remote learning mode in which instructor take classes through online meeting platforms like zoom, google meet etc So that student can attend lecture by remain at home

But what actually happens as students are at home most of them bunk online lectures due to which they are not able to prepare well for exams and learn things in a proper manner as currently no platform is available to track the whether student actually attending lecture sincerely or not.    
</p>

### Solution proposed: 

<p>
So we the team Ultra Noobs decide to develop a platform named attender, the aim of this platform is to track whether a student is actually attending classes or just joined. In this platform, the instructor can create a lecture and after creating the lecture we will provide a unique id to the instructor which he needs to circulate among his students.
As a student, you need to register yourself on this platform and upload your image for detection purposes. After registering you need to log in yourself after login you can enter the id which is provided by the course instructor of the current lecture and then click on the start button and now you are all done. Now students attend classes as they normally attend but they need to open our web in another tab so that we can track them. And all this attendance information will be available for the instructor responsible for that particular lecture after the lecture ends.
</p>

#### Algo behind attendence tracking: 

<p>
We decided to track students for continuous 1 minute in the interval of 5 minutes and if our web detects the student during that one minute then the student will be marked present for that 5 minutes otherwise the student will be marked absent for that interval. so let's assume that if the duration of the lecture is 50 min then our web will detect 10 times and store the total number of times a particular student detected. we decide that the one minute in the interval of 5 minutes will be chosen randomly so that the student can't predict when he/she is going to be detected.  
</p>

### Tech Stack: 
<span>
<img src="logo/nodejs.png" height="40"> <img src="logo/ejs.png" height="40">
<img src="logo/css3.png" height="40"> <img src="logo/mongo.png" height="40">
<img src="logo/mongoose.png" height="40"> <img src="logo/express.png" height="40">
<img src="logo/bootstrap.png" height="40">
<span>

 ### For face detection:
 
 [face-api.js](https://justadudewhohacks.github.io/face-api.js/docs/index.html)

### Team members; 
 - Keshav Agarwal <br />
  <a href="https://www.linkedin.com/in/keshav-agarwal-84b5221a9/"><img src="https://edent.github.io/SuperTinyIcons/images/svg/linkedin.svg" width="30" title="LinkedIn" /></a> <a href="https://github.com/The-Keshav-Agarwal"><img  src="https://edent.github.io/SuperTinyIcons/images/png/github.png" width="30" /></a>
 - Nitanshu Lokhande <br />
  <a href="https://www.linkedin.com/in/nitanshu-lokhande-5b60691a0/"><img src="https://edent.github.io/SuperTinyIcons/images/svg/linkedin.svg" width="30" title="LinkedIn" /></a> <a href="https://github.com/nlok5923"><img  src="https://edent.github.io/SuperTinyIcons/images/png/github.png" width="30" /></a>

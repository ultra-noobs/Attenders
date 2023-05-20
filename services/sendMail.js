const studentData = require('../models/studentData')
const nodemailer = require('nodemailer')
const session = require('../models/session')
const lectureData = require('../models/lectureData')

const sendEmail = async (attendenceData, recepient) => {

    console.log(' this is attendence data ', attendenceData);
    // Create a Nodemailer transporter using your email provider details
    let transporter = nodemailer.createTransport({
      service: 'smtp',
      auth: {
        user: 'yoyo5923@zohomail.in',
        pass: 'yyYY@@22',
      },
    });

    const attendencDataHtml = 
attendenceData.map(attendence => ` <div>
    lecture name: ${attendence.lectureName}
    Lecture start time: ${attendence.startTime}
    Lecture end time: ${attendence.endTime}
    Lecture Data: ${attendence.date}
</div>`).join('');
  
    // Email content
    const mailOptions = {
      from: 'yoyo5923@zohomail.in',
      to: recepient,
      subject: 'Weekly Attendence report',
      html: `
        <h1>Attendence report</h1>
        <h2> Your ward was present on these lectures this week </h2>
        ${attendencDataHtml}
      `,
    };
  
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

const studentAttendenceData = async (studentId) => {

    const attendedLectures = [];
    const studentSessions = await session.find({ student_id: studentId });
    console.log("student session ", studentSessions);
    for(let i=0; i < studentSessions.length; i++) {
        const sessionId = studentSessions[i].id; 
        //! need to add here criteria for considering it as attendence 
        const lectureDetails = await lectureData.find({ lecture_id: sessionId });
        console.log(' this is lecuture ', lectureDetails)
        attendedLectures.push({
            lectureName: lectureDetails[0].lecture_name,
            startTime: lectureDetails[0].st_time,
            endTime: lectureDetails[0].end_time,
            date: lectureDetails[0].lecture_date
        });
    }

    return attendedLectures;
}

const sendMailToAllStudentParents = async () => {
    const allStudentData = await studentData.find({});
    console.log('All student data ', allStudentData);

    for(let i=0; i < allStudentData.length; i++) {
        const studentId = allStudentData[i].student_id;
        const parentEmail = allStudentData[i].parent_email || '';

        if(parentEmail !== '') {
            const attendenceData = await studentAttendenceData(studentId, parentEmail);
            await sendEmail(attendenceData, parentEmail);
        }
    }

}

module.exports = { sendMailToAllStudentParents }
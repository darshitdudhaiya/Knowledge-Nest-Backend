import Jwt from "../../../utils/Jwt.js";
import Users from "../../../models/Users.js";
import Semesters from "../../../models/Semesters.js";
import Classes from "../../../models/Classes.js";
import Password from "../../../utils/Password.js";
import UserRoles from "../../../models/UserRoles.js";
import StudentData from "../../../models/StudentData.js";
import Subjects from "../../../models/Subjects.js";
import UserProfile from "../../../models/UserProfile.js";
import AssignedSubjects from "../../../models/AssignedSubjects.js";
import nodemailer from "nodemailer";
import {
  studentDataValidator,
  facultyDataValidator,
  adminDataValidator,
} from "./AddUserValidators.js";
import Mail from "../../../utils/Mail.js";

export default async function addUser(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userRoleName = req.params.userrole;
    const userRole = await UserRoles.findOne({ where: { Name: userRoleName } });
    if (!userRole) {
      return res.status(404).json({
        message: "User Role not found",
      });
    }

    let user = {};

    if (userRoleName == "Student" || userRoleName == "student")
      user = await studentDataValidator.validateAsync(req.body);
    else if (userRoleName == "faculty")
      user = await facultyDataValidator.validateAsync(req.body);
    else user = await adminDataValidator.validateAsync(req.body);

    if ("AssignedSubjects" in user) {
      const subjectPromises = user.AssignedSubjects.map(async (subject) => {
        const foundSubject = await Subjects.findOne({
          where: { Name: subject },
        });
        if (!foundSubject) {
          return { message: `${subject} not found` };
        }
      });

      const results = await Promise.all(subjectPromises);
      const notFoundSubjects = results.filter((result) => result);
      if (notFoundSubjects.length > 0) {
        return res.status(404).json({
          message: "Enter Valid Subjects",
          details: notFoundSubjects.map((result) => result.message),
        });
      }
    }

    if (userRoleName == "Student" || userRoleName == "student") {
      const userClass = await Classes.findByPk(user.ClassId);
      if (!userClass) {
        return res.status(404).json({
          message: "Class not found",
        });
      }

      const userSemester = await Semesters.findByPk(user.SemesterId);
      if (!userSemester) {
        return res.status(404).json({
          message: "Semester not found",
        });
      }

      if (userClass.YearId != userSemester.YearId) {
        return res.status(404).json({
          message: "Semester and Class Does not belong to same Year",
        });
      }
    }

    user["UserRoleId"] = userRole.dataValues.id;
    user["Password"] = Password.generateRandomPassword(10);

    const createdUser = await Users.create(user);

    user["UserId"] = createdUser.id;

    await UserProfile.create(user);
    delete user["UserId"];

    if (userRoleName == "Student" || userRoleName == "student") {
      user["StudentId"] = createdUser.id;
      await StudentData.create(user);
    } else if (userRoleName == "faculty") {
      user["FacultyId"] = createdUser.id;
      if ("AssignedSubjects" in user) {
        await Promise.all(
          user.AssignedSubjects.map(async (subject) => {
            const subjectFromDb = await Subjects.findOne({
              where: { Name: subject },
            });

            await AssignedSubjects.create({
              FacultyId: user.FacultyId,
              SubjectId: subjectFromDb.dataValues.id,
            });
          })
        );
      }
    }

    console.log(user);

    const html_content = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Registration Confirmation</title>
    </head>
    <body>
        <h2>Thank you for registering!</h2>
        <p>Your registration was successful. Welcome aboard!</p>
        <br/>
        <p>Email : ${user.Email}</p>
        <br/>
        <p>Password : ${user.Password}</p>
    </body>
    </html>
    `;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "darshitdudhaiya201@gmail.com",
        pass: "tzka zrxd ggxx lvxe",
      },
    });
    const info = await transporter.sendMail({
      from: "darshitdudhaiya201@gmail.com", // sender address
      to: user.Email, // list of receivers
      subject: "Registration Confirmation", // Subject line
      text: "Thank you for registering!", // plain text body
      html: html_content, // html body
    });

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }

    return res.status(400).json({
      message: error.message,
    });
  }
}

DROP DATABASE IF EXISTS `KnowledgeNest`;
CREATE DATABASE `KnowledgeNest`;
USE `KnowledgeNest`;

CREATE TABLE `UserRoles`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Name` VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE `Users`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Email` VARCHAR(50) UNIQUE NOT NULL,
    `Password` VARCHAR(50) NOT NULL,
    `IsActivate` BOOLEAN DEFAULT 1,

    `UserRoleId` INT NOT NULL,
    CONSTRAINT `FkUserRoleIdInUsers` FOREIGN KEY (`UserRoleId`) REFERENCES `UserRoles`(`Id`)
);

CREATE TABLE `UserProfile`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Name` VARCHAR(100) NOT NULL,
    `Gender` VARCHAR(10) NOT NULL,
    `Contact` VARCHAR(10) NOT NULL,
    `Address` VARCHAR(200) NOT NULL,
    `ImageName` VARCHAR(50) NOT NULL,

    `UserId` INT NOT NULL,
    CONSTRAINT `FkUserIdInUserProfile` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`)
);

CREATE TABLE `Streams`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Name` VARCHAR(100) NOT NULL
);

CREATE TABLE `Years`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Name` VARCHAR(100) NOT NULL,

    `StreamId` INT NOT NULL,
    CONSTRAINT `FkStreamIdInYears` FOREIGN KEY (`StreamId`) REFERENCES `Streams`(`Id`)
);

CREATE TABLE `Semesters`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Semester` INT NOT NULL,

    `YearId` INT NOT NULL,
    CONSTRAINT `FkYearIdInSemesters` FOREIGN KEY (`YearId`) REFERENCES `Years`(`Id`)
);

CREATE TABLE `Subjects`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Name` VARCHAR(50) NOT NULL,

    `SemesterId` INT NOT NULL,
    CONSTRAINT `FkSemesterIdInSubjects` FOREIGN KEY (`SemesterId`) REFERENCES `Semesters`(`Id`)
);

CREATE TABLE `AssignedSubjects`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,

    `FacultyId` INT NOT NULL,
    CONSTRAINT `FkFacultyIdInAssignedSubjects` FOREIGN KEY (`FacultyId`) REFERENCES `Users`(`Id`),

    `SubjectId` INT NOT NULL,
    CONSTRAINT `FkSubjectIdInAssignedSubjects` FOREIGN KEY (`SubjectId`) REFERENCES `Subjects`(`Id`)
);

CREATE TABLE `Classes`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Division` VARCHAR(20) NOT NULL,
    
    `YearId` INT NOT NULL,
    CONSTRAINT `FkYearIdInClasses` FOREIGN KEY (`YearId`) REFERENCES `Years`(`Id`)
);

CREATE TABLE `StudentData`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `EnrollmentNumber` VARCHAR(12) NOT NULL,

    `ClassId` INT NOT NULL,
    CONSTRAINT `FkClassIdInStudentData` FOREIGN KEY (`ClassId`) REFERENCES `Classes`(`Id`)

    `StudentId` INT NOT NULL,
    CONSTRAINT `FkStudentIdInStudentData` FOREIGN KEY (`StudentId`) REFERENCES `Users`(`Id`)
);

CREATE TABLE `Videos`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Title` VARCHAR(50) NOT NULL,
    `Description` VARCHAR(300) NOT NULL,
    `IsApproved` BOOLEAN DEFAULT 0,
    `FileName` VARCHAR(50) NOT NULL,
    `ThumbnailName` VARCHAR(50) NOT NULL,

    `UserId` INT NOT NULL,
    CONSTRAINT `FkUserIdInVideos` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`),
 
    `SubjectId` INT NOT NULL,
    CONSTRAINT `FkSubjectIdInVideos` FOREIGN KEY (`SubjectId`) REFERENCES `Subjects`(`Id`)
);

CREATE TABLE `AttachmentTypes`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Extension` VARCHAR(50) NOT NULL
);

CREATE TABLE `VideoAttachments`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `FileName` VARCHAR(50) NOT NULL,

    `VideoId` INT NOT NULL,
    CONSTRAINT `FkVideoIdInVideoAttachments` FOREIGN KEY (`VideoId`) REFERENCES `Videos`(`Id`),
    
    `AttachmentTypeId` INT NOT NULL,
    CONSTRAINT `FkAttachmentTypeIdInVideoAttachments` FOREIGN KEY (`AttachmentTypeId`) REFERENCES `AttachmentTypes`(`Id`)
);

CREATE TABLE `Assignments`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Title` VARCHAR(50) NOT NULL,
    `Description` VARCHAR(300) NOT NULL,
    `LastSubmissionDate` DATE NOT NULL,
    `Marks` INT NOT NULL,
    `PassingMarks` INT NOT NULL,

    `UserId` INT NOT NULL,
    CONSTRAINT `FkUserIdInAssignments` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`),
 
    `SubjectId` INT NOT NULL,
    CONSTRAINT `FkSubjectIdInAssignments` FOREIGN KEY (`SubjectId`) REFERENCES `Subjects`(`Id`),

    `ClassId` INT NOT NULL,
    CONSTRAINT `FkClassIdInAssignments` FOREIGN KEY (`ClassId`) REFERENCES `Classes`(`Id`)
);

CREATE TABLE `AssignmentAttachments`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `FileName` VARCHAR(50) NOT NULL,

    `AssignmentId` INT NOT NULL,
    CONSTRAINT `FkAssignmentIdInAssignmentAttachments` FOREIGN KEY (`AssignmentId`) REFERENCES `Assignments`(`Id`),
    
    `AttachmentTypeId` INT NOT NULL,
    CONSTRAINT `FkAttachmentTypeIdInAssignmentAttachments` FOREIGN KEY (`AttachmentTypeId`) REFERENCES `AttachmentTypes`(`Id`)
);

CREATE TABLE `AssignmentSubmissions`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `FileName` VARCHAR(50) NOT NULL,
    
    `StudentId` INT NOT NULL,
    CONSTRAINT `FkStudentIdInAssignmentSubmissions` FOREIGN KEY (`StudentId`) REFERENCES `Users`(`Id`),

    `AssignmentId` INT NOT NULL,
    CONSTRAINT `FkAssignmentIdInAssignmentSubmissions` FOREIGN KEY (`AssignmentId`) REFERENCES `Assignments`(`Id`)
);

CREATE TABLE `AssignmentMarks`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Marks` INT DEFAULT 0,

    `AssignmentSubmissionId` INT NOT NULL,
    CONSTRAINT `FkAssignmentSubmissionIdInAssignmentMarks` FOREIGN KEY (`AssignmentSubmissionId`) REFERENCES `AssignmentSubmissions`(`Id`)
);

CREATE TABLE `Quizzes`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Title` VARCHAR(50) NOT NULL,
    `Description` VARCHAR(300) NOT NULL,
    `LastSubmissionDate` DATE NOT NULL,
    `Marks` INT NOT NULL,
    `PassingMarks` INT NOT NULL,
    `TotalQuestions` INT NOT NULL,

    `UserId` INT NOT NULL,
    CONSTRAINT `FkUserIdInQuizzes` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`),
 
    `SubjectId` INT NOT NULL,
    CONSTRAINT `FkSubjectIdInQuizzes` FOREIGN KEY (`SubjectId`) REFERENCES `Subjects`(`Id`),

    `ClassId` INT NOT NULL,
    CONSTRAINT `FkClassIdInQuizzes` FOREIGN KEY (`ClassId`) REFERENCES `Classes`(`Id`)
);

CREATE TABLE `QuizeQuestions`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Question` VARCHAR(300) NOT NULL,

    `QuizeId` INT NOT NULL,
    CONSTRAINT `FkQuizeIdInQuizeQuestions` FOREIGN KEY (`QuizeId`) REFERENCES `Quizzes`(`Id`)
);

CREATE TABLE `QuestionOptions`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Value` VARCHAR(100) NOT NULL,
    `IsCorrect` BOOLEAN DEFAULT 0,

    `QuestionId` INT NOT NULL,
    CONSTRAINT `FkQuestionIdInQuestionOptions` FOREIGN KEY (`QuestionId`) REFERENCES `QuizeQuestions`(`Id`)
);

CREATE TABLE `QuizeSubmissions`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,

    `StudentId` INT NOT NULL,
    CONSTRAINT `FkStudentIdInQuizeSubmissions` FOREIGN KEY (`StudentId`) REFERENCES `Users`(`Id`),

    `QuizeId` INT NOT NULL,
    CONSTRAINT `FkQuizeIdInQuizeSubmissions` FOREIGN KEY (`QuizeId`) REFERENCES `Quizzes`(`Id`)
);

CREATE TABLE `QuizeSubmissionRecords`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,

    `QuizeSubmissionId` INT NOT NULL,
    CONSTRAINT `FkQuizeSubmissionIdInQuizeSubmissionRecords` FOREIGN KEY (`QuizeSubmissionId`) REFERENCES `QuizeSubmissions`(`Id`),

    `QuestionId` INT NOT NULL,
    CONSTRAINT `FkQuestionIdInQuizeSubmissionRecords` FOREIGN KEY (`QuestionId`) REFERENCES `QuizeQuestions`(`Id`),

    `OptionId` INT NOT NULL,
    CONSTRAINT `FkOptionIdInQuizeSubmissionRecords` FOREIGN KEY (`OptionId`) REFERENCES `QuestionOptions`(`Id`)
);

CREATE TABLE `QuizeMarks`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Marks` INT DEFAULT 0,

    `QuizeSubmissionId` INT NOT NULL,
    CONSTRAINT `FkQuizeSubmissionIdInQuizeMarks` FOREIGN KEY (`QuizeSubmissionId`) REFERENCES `QuizeSubmissions`(`Id`)
);

CREATE TABLE `Circulars`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,

    `UserId` INT NOT NULL,
    CONSTRAINT `FkUserIdInCirculars` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`),

    `SubjectId` INT NOT NULL,
    CONSTRAINT `FkSubjectIdInCirculars` FOREIGN KEY (`SubjectId`) REFERENCES `Subjects`(`Id`)  
);

CREATE TABLE `CircularRecords`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Record` LONGTEXT NOT NULL,

    `UserId` INT NOT NULL,
    CONSTRAINT `FkUserIdInCircularRecords` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`),
    
    `CircularId` INT NOT NULL,
    CONSTRAINT `FkCircularIdInCircularRecords` FOREIGN KEY (`CircularId`) REFERENCES `Circulars`(`Id`)
);

CREATE TABLE `Discussions`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,

    `UserId` INT NOT NULL,
    CONSTRAINT `FkUserIdInDiscussions` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`),

    `ClassId` INT NOT NULL,
    CONSTRAINT `FkClassIdInDiscussions` FOREIGN KEY (`ClassId`) REFERENCES `Classes`(`Id`),

    `SubjectId` INT NOT NULL,
    CONSTRAINT `FkSubjectIdInDiscussions` FOREIGN KEY (`SubjectId`) REFERENCES `Subjects`(`Id`)  
);

CREATE TABLE `DiscussionRecords`
(
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Record` LONGTEXT NOT NULL,

    `UserId` INT NOT NULL,
    CONSTRAINT `FkUserIdInDiscussionRecords` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`),

    `DiscussionId` INT NOT NULL,
    CONSTRAINT `FkDiscussionIdInDiscussionRecords` FOREIGN KEY (`DiscussionId`) REFERENCES `Discussions`(`Id`)
);
import cors from "cors";
import express from "express";
import authRouter from "./routes/AuthRoutes.js";
import userRolesRouter from "./routes/UserRolesRoutes.js";
import streamRouter from "./routes/StreamsRoutes.js";
import yearRouter from "./routes/YearsRoutes.js";
import semesterRouter from "./routes/SemestersRoutes.js";
import subjectRouter from "./routes/SubjectsRoutes.js";
import assignedSubjectRouter from "./routes/AssignedSubjectsRoutes.js";
import classes from "./routes/ClassesRoutes.js";
import attachmentTypeRouter from "./routes/AttachmentTypesRoutes.js";
import assignmentRouter from "./routes/AssignmentsRoutes.js";
import quizzeRouter from "./routes/QuizzesRoutes.js";
import quizzeQuestionsRouter from "./routes/QuizeQuestionsRoutes.js";
import questionOptionsRouter from "./routes/QuestionOptionsRoutes.js";
import quizeSubmissionRouter from "./routes/QuizeSubmissionsRoutes.js";
import quizeMarksRouter from "./routes/QuizeMarksRoutes.js";
import circularsRouter from "./routes/CircularsRoutes.js";
import circularRecordsRouter from "./routes/CircularRecordsRoutes.js";
import videoRouter from "./routes/VideoRoutes.js";
import usersRouter from "./routes/UsersRoutes.js";
import assignmentAttachmentRouter from "./routes/AssignmentAttachmentsRoutes.js";
import assignmentSubmissionRouter from "./routes/AssignmentSubmissionRoutes.js";
import videoAttachmentRouter from "./routes/VideoAttachmentsRoutes.js";
import quizeSubmissionRecordRouter from "./routes/QuizeSubmissionRecordsRoutes.js";
import discussionRouter from "./routes/DiscussionRoutes.js";
import discussionRecordsRouter from "./routes/DiscussionRecordsRoutes.js";
import assignmentMarksRouter from "./routes/AssignmentMarksRoutes.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/knowledgenest/auth", authRouter);
app.use("/knowledgenest/userroles", userRolesRouter);
app.use("/knowledgenest/streams", streamRouter);
app.use("/knowledgenest/years", yearRouter);
app.use("/knowledgenest/semesters", semesterRouter);
app.use("/knowledgenest/users", usersRouter);
app.use("/knowledgenest/subjects", subjectRouter);
app.use("/knowledgenest/assigned-subjects", assignedSubjectRouter);
app.use("/knowledgenest/classes", classes);
app.use("/knowledgenest/attachment-types", attachmentTypeRouter);
app.use("/knowledgenest/assignments", assignmentRouter);
app.use("/knowledgenest/assignment-submissions", assignmentSubmissionRouter);
app.use("/knowledgenest/assignment-attachments", assignmentAttachmentRouter);
app.use("/knowledgenest/assignment-marks", assignmentMarksRouter);
app.use("/knowledgenest/quizze/quizzes", quizzeRouter);
app.use("/knowledgenest/quizze/quize-questions", quizzeQuestionsRouter);
app.use("/knowledgenest/quizze/question-options", questionOptionsRouter);
app.use(
  "/knowledgenest/quize-submission/quize-submissions",
  quizeSubmissionRouter
);
app.use("/knowledgenest/quize-submission/quize-marks", quizeMarksRouter);
app.use(
  "/knowledgenest/quize-submission/quize-submission-records",
  quizeSubmissionRecordRouter
);
app.use("/knowledgenest/circulars", circularsRouter);
app.use("/knowledgenest/circularrecords", circularRecordsRouter);
app.use("/knowledgenest/videos", videoRouter);
app.use("/knowledgenest/video-attachments", videoAttachmentRouter);
app.use("/knowledgenest/discussions", discussionRouter);
app.use("/knowledgenest/discussions", discussionRecordsRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(3001, () => {
  console.log(`Server listening at port 3001`);
  console.log(`URL : 127.0.0.1:3001/knowledgenest`);
});

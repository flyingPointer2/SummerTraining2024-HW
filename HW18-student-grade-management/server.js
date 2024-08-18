const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// MongoDB连接设置
mongoose.connect('mongodb://127.0.0.1:27017/studentGradesDB');

const studentSchema = new mongoose.Schema({
    studentId: Number,
    name: String,
    scores: {
        math: Number,
        english: Number,
        chinese: Number
    }
});

const Student = mongoose.model('Student', studentSchema);

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 路由
app.post('/students', async (req, res) => {
    const { studentId, name, scores } = req.body;
    try {
        const newStudent = new Student({ studentId, name, scores });
        await newStudent.save();
        res.status(201).send('Student added successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/students/:studentId', async (req, res) => {
    try {
        const student = await Student.findOne({ studentId: req.params.studentId });
        if (student) {
            // 转换查询信息中的科目名称为中文
            const scores = {
                '数学': student.scores.math,
                '英语': student.scores.english,
                '语文': student.scores.chinese
            };
            const result = {
                studentId: student.studentId,
                name: student.name,
                scores: scores
            };
            res.status(200).json(student);
        } else {
            res.status(404).send('Student not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});


// 从数据库导出数据
app.get('/export', async (req, res) => {
    try {
        const students = await Student.find({});
        // "\ufeff"解决中文乱码问题，此时编码为"UTF-8-BOM"，在Windows下用Excel软件打开后可正常显示
        let csvContent = "\ufeff"+"学号,姓名,数学成绩,英语成绩,语文成绩\n";
        students.forEach(student => {
            csvContent += `${student.studentId},${student.name},${student.scores.math},${student.scores.english},${student.scores.chinese}\n`;
        });
        res.header('Content-Type', 'text/csv');
        res.attachment("students-grades.csv");
        res.send(csvContent);
    } catch (error) {
        res.status(500).send("Error exporting data: " + error);
    }
});


// 启动服务器
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

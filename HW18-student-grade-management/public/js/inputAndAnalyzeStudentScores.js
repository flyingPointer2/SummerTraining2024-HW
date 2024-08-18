// 定义所需变量
let students = {};
let student_name = "";
let student_id = -9999999999;
let math_score = -1;
let english_score = -1;
let chinese_score = -1;

let analyze_result = "";

// 获取按钮和输入框的引用
var getInputScoreBtn = document.getElementById('inputScoresBtn');   // 录入成绩
var getQueryScoreBtn = document.getElementById('queryScoresBtn');   // 查询成绩
var getclearAnalysisBtn = document.getElementById('clearAnalysisBtn');   // 清除已有的分析
var getExportScoreBtn = document.getElementById('exportScoresBtn');   // 导出成绩


var userInput_name = document.getElementById('student_name');
var userInput_id = document.getElementById('student_id_input');
var userInput_MathScore = document.getElementById('student_Math_score');
var userInput_EngScore = document.getElementById('student_English_score');
var userInput_ChinsesScore = document.getElementById('student_Chinese_score');

// 为按钮添加点击事件监听器

// 录入成绩 - 使用 fetch 发送 POST 请求
getInputScoreBtn.addEventListener('click', async function() {
    const student = {
        studentId: parseInt(userInput_id.value),
        name: userInput_name.value,
        scores: {
            math: parseInt(userInput_MathScore.value),
            english: parseInt(userInput_EngScore.value),
            chinese: parseInt(userInput_ChinsesScore.value)
        }
    };

    try {
        const response = await fetch('http://localhost:3000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });

        if (response.ok) {
            alert('学生信息录入成功！');
            document.getElementById('student_input_form').reset();
        } else {
            throw new Error('Failed to add student');
        }
    } catch (error) {
        alert(error.message);
    }
});

// 查询成绩 - 使用 fetch 发送 GET 请求
getQueryScoreBtn.addEventListener('click', async function() {
    const studentId = document.getElementById('student_id_query').value;
    try {
        const response = await fetch(`http://localhost:3000/students/${studentId}`);
        if (response.ok) {
            const student = await response.json();
            const scores = student.scores;
            // 先将字符串格式转化为数据格式
            const scoreValues = Object.values(scores).map(score => parseFloat(score));
            // 获取最大分数和最小分数
            const maxScore = Math.max(...scoreValues);
            const minScore = Math.min(...scoreValues);

            // 找到最大分数对应的科目
            const maxSubject = Object.keys(scores).find(key => parseFloat(scores[key]) === maxScore);
            // 找到最小分数对应的科目
            const minSubject = Object.keys(scores).find(key => parseFloat(scores[key]) === minScore);

            // 计算平均分
            const averageScore = scoreValues.reduce((acc, curr) => acc + curr, 0) / scoreValues.length;

            document.getElementById('analysisResult').innerHTML = `\
            <p>平均分：${averageScore.toFixed(2)}<br>\
            最大分数对应的科目: ${maxSubject}，其分数为 ${maxScore.toFixed(2)} <br>\
            最小分数对应的科目: ${minSubject}，其分数为 ${minScore.toFixed(2)} </p>`
 
        } else {
            throw new Error('Student not found');
        }
    } catch (error) {
        document.getElementById('analysisResult').innerHTML = '查无此人！';
    }
});


// 清除网页内显示的查询分析结果
getclearAnalysisBtn.addEventListener('click', function() {
    document.getElementById('analysisResult').innerHTML = '';
});

// 导出学生成绩信息到CSV文件
getExportScoreBtn.addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/export';
});
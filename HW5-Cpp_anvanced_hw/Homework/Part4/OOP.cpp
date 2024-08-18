#include <iostream>
#include <vector>

class Human
{
    virtual void Eat() = 0;        // 吃饭
    virtual void TakeClass() = 0;  // 上课学习
    virtual void Research() = 0;   // 科研
    virtual void Teach() = 0;      // 教学
};

class Student;
class PostGraduate;

class Teacher : public Human  // 教师
{
    std::vector<Student*> students;              // 班内的学生
    std::vector<UnderGraduate*> underGraduates;  // 做辅导员带的本科生
    std::vector<PostGraduate*> postGraduates;    // 带的研究生
};

class Student : public Human  // 学生
{
    Teacher* classTeacher;  // 班主任
};

class UnderGraduate : public Student  // 本科生
{
    Teacher* leader;  // 辅导员
};

class PostGraduate : public Student  // 研究生
{
    Teacher* tutor;  // 导师
};

int main()
{
    return 0;
}
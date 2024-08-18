#include <iostream>
#include <vector>

// 人
class Human
{
    virtual void Eat() = 0;        // 吃饭
    //virtual void TakeClass() = 0;  // 上课学习
    //virtual void Research() = 0;   // 科研
    //virtual void Teach() = 0;      // 教学
};

// 本科生
class Undergraduate : public Human
{
    void Eat() override
    {
        std::cout << "An undergraduate eats." << std::endl;
    }

    void Takeclass()    // 上课学习
    {
        std::cout << "An undergraduate takes class." << std::endl;
    }
};

// 研究生
class PostGraduate : public Human
{
    void Eat() override
    {
        std::cout << "A postgraduate eats." << std::endl;
    }

    void Research()     // 科研
    {
        std::cout << "A postgraduate is doing research." << std::endl;
    }

    void Takeclass()    // 上课学习
    {
        std::cout << "A postgraduate takes class." << std::endl;
    }

};

// 辅导员（简化假设：所有辅导员都是研究生）
class Tutor: public PostGraduate
{
    std::vector<Undergraduate*> myStudents; // 带的本科生
};

// 老师
class Teacher : public Human
{
    void Eat() override
    {
        std::cout << "A Teacher eats." << std::endl;
    }

    void Research()     // 科研
    {
        std::cout << "A Teacher is doing research." << std::endl;
    }

    void Teach()        // 教学
    {
        std::cout << "A Teacher is teaching." << std::endl;
    }

    std::vector<PostGraduate*> myPostgraduates; // 带的研究生

};

// 班主任（简化假设：所有班主任均是研究生导师）
class classTeacher : public Teacher
{
    std::vector<Undergraduate*> myClassUndergraduates;  // 班里的本科生
    Tutor* myClassTutor;    // 所带班级的辅导员
};


int main()
{
    return 0;
}
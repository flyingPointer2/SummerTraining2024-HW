# C++ 进阶知识介绍作业

2024/07/24 $\quad$ SigureLing  

## 作业内容

### 1. 编译与链接

1. 将 ./Homework/Part1 下的代码用 g++ 编译成可执行程序，命名为 `main.exe`。请在下面的代码框中写出需要用到的命令：

```bash
g++ -o main.exe Fibo.cpp main.cpp
```

2. 将 ./Homework/Part1 下的 Fibo.cpp 编译为静态库，命名为 `libfibo.a`，并将 `main.cpp` 通过库运行。请在下面的代码框中写出需要用到的命令：

```bash
g++ -c Fibo.cpp -o Fibo.o
ar crv libfibo.a Fibo.o
g++ -static main.cpp -L . -lfibo -o main2
```

### 2. Makefile 与 CMake

编写一个 CMakeLists.txt，以确保 ./Homework/Part2 下的代码可以正常生成可执行文件，编译出的可执行文件命名为 `main.exe`。请在下面的代码框中将对应的 CMakeLists.txt 补充完整：

> 本题中，`ThirdLib` 相当于一个第三方的开源库，且这个库是 Header-Only 的，大家在后续的开发中，尤其是 C++ 的开发中，也会经常见到这类库。关于 Header-Only 有什么好处，可以参考如下链接：
>
> https://stackoverflow.com/questions/12671383/benefits-of-header-only-libraries

``` cmake
cmake_minimum_required(VERSION 3.5)

set(CMAKE_C_COMPILER gcc)
set(CMAKE_CXX_COMPILER g++)

# project name, means Fibnacci and Factorial calculation test
project(FibAndFact)

# set include directories
set(INCLUDE_DIR ${PROJECT_SOURCE_DIR}/include)
set(THIRD_INCLUDE_DIR ${PROJECT_SOURCE_DIR}/ThirdLib/include)

# set source files directory
aux_source_directory(${PROJECT_SOURCE_DIR}/src SRC_DIR)

# add a compilation task
add_executable(main ${SRC_DIR})

# add all the header files
target_include_directories(main PUBLIC ${INCLUDE_DIR} ${THIRD_INCLUDE_DIR})

```

### 3. C++ 多文件编程

将 ./Homework/Part3/SingleFile.cpp 的代码改写成多文件编程，要求有三个文件：

* `io.h`：`readNumber()`、`writeAnswer()` 函数的声明
* `io.cpp`：`readNumber()`、`writeAnswer()`函数的定义
* `main.cpp`：和 `SingleFile.cpp` 中的定义保持一致

【修改后的代码见` Part3/`，头文件在其中的`include`目录，源文件在其中的`src`目录；提供了`CMakeLists.txt`文件】

### 4. 面向对象程序设计基础

./Homework/Part4/OOP.cpp 中的代码是某同学在某校某系《计算机程序设计基础（2）》期末大作业中设计的『学生管理系统』代码架构。请你观察一下，这个代码是否符合我们所学的 OOP 规范？如果符合，请逐个规范分析；如不符合，请按照我们本课程所学的知识，尽可能将其修改地更合理。

要求：可以适当添加其他类或接口，应当按照题目已经给出的四种方法，来合理安排继承、组合的关系，每个方法的具体实现不要求给出代码实现。

【修改后的代码见`Part4/OOP_modified.cpp`】【主要修改：减轻耦合；理顺逻辑与继承关系】

### 5. Modern C++

1.请判断以下各项是否为常量表达式（在各行注释里填写答案）

```c++
int a = 1;
const int b = 1; // 是（示例）
const int c = a + 1; // 不是
const int d = b + 1; // 是
const int e = a + b; // 不是
constexpr int f = 1 + 1; // 是 
```

2.请使用基于范围的 for 循环，补充下面的代码，计算数组 `vec` 的和，并将各个值输出出来，再将各个值加一。

```c++
#include <vector>
#include <iostream>

int main()
{
    std::vector<int> vec{123, 456, 789};
    // 计算数组 `vec` 的和
    int sum_vec = 0;
    for (int v : vec)
    {
        sum_vec += v;
    }
    std::cout << "The sum of vector is: " << sum_vec << std::endl;
    
    // 将各个值输出出来，再将各个值加一
    for (int& v : vec)
    {
        std::cout << v << std::endl;
        v += 1;
    }

    // 检测
    std::cout << "After adding 1 to each element:\n";
    for (int v : vec)
    {
        std::cout << v << std::endl;
    }

    return 0;
}
```

3.请简要分析，./Homework/Part5/Lambda.cpp 中的代码可能会导致什么问题？为什么会出现这样的问题？在下面作答。（提示：变量的生命周期）

经过编译、运行，得到如下结果：

```
Hello from member function: askldjaslkdjdaslkjsadlkjadslkjdsa
Hello from member function: askldjaslkdjdaslkjsadlkjadslkjdsa world!
Hello from lambda: Phpfpkjsadlkjadslkjdsa world!
```

主要的问题是第三行的输出产生了“意料之外”的结果。

原因在于，由于`str`是在`bar`函数的栈上创建的。由于线程延迟时间设置的问题（`bar`函数延迟1秒、lambda表达式`f`延迟 2秒），首先发生的是`bar`函数运行完成并返回，此时`str`的生命周期结束；但是，lambda表达式`f`仍然持有对`str`的引用。这会导致未定义行为，因为lambda表达式`f`所在线程可能会访问已经释放的内存。



4.判断以下各项是否为右值：

```c++
int a = 1;// 在各行注释中填写答案
1 // 是（示例）
"1" // 不是
-1 // 是
a // 不是
std::move(a) // 是
std::forward<int>(a) // 是
static_cast<int&>(a) // 不是
```

5.请简要分析以下两段代码有什么问题？写在代码块下面即可。（提示：临时对象的析构问题）


```c++
std::thread([]
            { do_something(); });
/*
当 std::thread 构造函数捕获lambda表达式时，它实际上捕获的是lambda表达式的副本。这个副本将被存储在新线程的栈上，并且其生命周期与新线程的生命周期绑定。
但是，原始的lambda表达式是一个临时对象，在 std::thread 构造调用结束后立即销毁。如果lambda表达式捕获了一些局部变量的引用，而这些局部变量在lambda表达式被销毁后仍然被线程访问，就会出现问题。因为这些局部变量可能已经超出了它们的生命周期，导致访问无效的内存。
*/
std::async(std::launch::async, []
           { do_something(); });

/*
类似地，由于lambda表达式是一个临时对象，其生命周期可能不足以覆盖异步任务的执行。lambda表达式所捕获的局部变量可能会在 std::async 调用结束后立即被销毁，而新线程可能还在尝试访问它们，这同样会导致未定义的行为。
*/
```



## 作业说明

本次作业共 10 道小题，可能题目较多、难度较大。因此，正确完成 6 道题及以上可记完成了一次作业；若你正确完成了 9 道题及以上，可以**额外**记完成了一次作业。

## 提交方法

将该文档、Part3 文件夹、Part4 文件夹三部分打包，命名为 学号\_姓名.zip，上传到下面的清华云盘链接。

https://cloud.tsinghua.edu.cn/u/d/1884a3bc9eae44b89b7b/

## 截止时间

该作业截止到暑假结束

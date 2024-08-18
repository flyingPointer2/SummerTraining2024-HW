#include <iostream>
#include "Fibo.h"
#include <ThirdLib.hpp>

int main()
{
    std::cout << Fibonacci(10);
    std::cout << ThirdLib::Fact(10);
    return 0;
}
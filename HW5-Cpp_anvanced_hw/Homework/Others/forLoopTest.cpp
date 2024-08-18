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
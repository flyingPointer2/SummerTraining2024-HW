#include <iostream>

void reference(auto & v)
{
    std::cout << "Left value" << std::endl;
}

void reference(auto && v)
{
    std::cout << "Right value" << std::endl;
}

int main()
{
    int a = 1;
    reference(1);
    reference("1");
    reference(-1);
    reference(a);
    reference(std::move(a));
    reference(std::forward<int>(a));
    reference(static_cast<int&>(a));

    return 0;
}

/*
1 // 是（示例）
"1" // 是
-1 // 是
a // 不是
std::move(a) // 是
std::forward<int>(a) // 
static_cast<int&>(a) //
*/
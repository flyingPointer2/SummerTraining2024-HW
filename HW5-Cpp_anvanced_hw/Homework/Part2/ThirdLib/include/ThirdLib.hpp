#pragma once

namespace ThirdLib
{
    int Fact(int n)
    {
        if (n == 0)
        {
            return 1;
        }
        else
        {
            return n * Fact(n - 1);
        }
    }
}  // namespace ThirdLib

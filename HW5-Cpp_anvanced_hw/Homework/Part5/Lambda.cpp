#include <iostream>
#include <thread>
#include <chrono>

struct Foo
{
    void bar(std::string str)
    {
        std::cout << "Hello from member function: " << str << std::endl;
        auto f = [&]
        {
            str += " world!";
            std::this_thread::sleep_for(std::chrono::seconds(2));
            std::cout << "Hello from lambda: " << str << std::endl;
        };
        std::thread(f).detach();
        std::this_thread::sleep_for(std::chrono::seconds(1));
        std::cout << "Hello from member function: " << str << std::endl;
    }
};

int main()
{
    Foo foo;
    foo.bar("askldjaslkdjdaslkjsadlkjadslkjdsa");
    std::this_thread::sleep_for(std::chrono::seconds(3));
    return 0;
}
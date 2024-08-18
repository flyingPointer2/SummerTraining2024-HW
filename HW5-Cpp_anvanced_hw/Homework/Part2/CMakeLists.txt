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

# output some key infomation
message(${CMAKE_SOURCE_DIR})
message(${PROJECT_SOURCE_DIR})
message(${SRC_DIR})
message(${INCLUDE_DIR})
message(${THIRD_INCLUDE_DIR})

import grpc
import Calculator_pb2
import Calculator_pb2_grpc

def generate_requests():
    ''' yield some requests for test '''
    operations = [
        (1, 2, Calculator_pb2.ADD),
        (4, -1, Calculator_pb2.SUBTRACT),
        (3, 3.14, Calculator_pb2.MULTIPLY),
        (6, 2, Calculator_pb2.DIVIDE),
        (6, 0, Calculator_pb2.DIVIDE)
    ]

    # Note: the parameters in the Constructor of Request should be consistent with those in `proto` file
    for operand1, operand2, myOperator in operations:
        yield Calculator_pb2.Request(operand1=operand1, operand2=operand2, myOperator=myOperator)

def run():
    with grpc.insecure_channel('localhost:50996') as channel:
        stub = Calculator_pb2_grpc.CalculateStub(channel)
        response = stub.Compute(iter(generate_requests()))
        print("Results: " + response.result)

if __name__ == '__main__':
    run()

# Output for these example requests is as follows:
# ```
# Results: 3 5 9.42 3 Error: Division by zero
# ```
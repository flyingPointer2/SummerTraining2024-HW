using Calculator;
using Grpc.Core;

namespace Calculator.Services
{
    // NOTE: It should inherit from the service name in `proto` file
    public class CalculatorService : Calculate.CalculateBase
    {
        private readonly ILogger<CalculatorService> _logger;
        public CalculatorService(ILogger<CalculatorService> logger)
        {
            _logger = logger;
        }

        public override async Task<Response> Compute(IAsyncStreamReader<Request> requestStream, ServerCallContext context)
        {
            List<string> results = [];

            await foreach (var request in requestStream.ReadAllAsync())
            {
                double result = 0;

                // NOTE: enum term should be written with only first letter Capital!
                switch (request.MyOperator)
                {
                    case Calculator.Operator.Add:
                        result = request.Operand1 + request.Operand2;
                        break;
                    case Calculator.Operator.Subtract:
                        result = request.Operand1 - request.Operand2;
                        break;
                    case Calculator.Operator.Multiply:
                        result = request.Operand1 * request.Operand2;
                        break;
                    case Calculator.Operator.Divide:
                        // Consider whether operand2 is zero
                        if (request.Operand2 != 0)
                        {
                            result = request.Operand1 / request.Operand2;
                        }
                        else
                        {
                            results.Add("Error: Division by zero");
                            continue;
                        }
                        break;
                }
                results.Add(result.ToString());
            }

            return new Response { Result = string.Join(" ", results) };
        }
    }
}

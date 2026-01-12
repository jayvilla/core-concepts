import Link from "next/link";
import DTOPatternExample from "@/components/validation/DTOPatternExample";
import ClassValidatorExample from "@/components/validation/ClassValidatorExample";
import ClassTransformerExample from "@/components/validation/ClassTransformerExample";
import StrongTypingSwaggerExample from "@/components/validation/StrongTypingSwaggerExample";
import ContractEnforcementExample from "@/components/validation/ContractEnforcementExample";
import ValidationComparison from "@/components/validation/ValidationComparison";

export default function ValidationPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Validation & DTOs
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Learn how to validate data at API boundaries using DTOs, class-validator, and class-transformer. Understand strong typing, Swagger integration, and enforcing contracts between frontend and backend.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <DTOPatternExample />
          <ClassValidatorExample />
          <ClassTransformerExample />
          <StrongTypingSwaggerExample />
          <ContractEnforcementExample />
          <ValidationComparison />
        </div>

        {/* Interview Tips */}
        <div className="mt-8 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            💡 Interview Tips
          </h2>
          <div className="space-y-4 text-gray-900">
            <div>
              <p className="font-semibold mb-2">Common Questions:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>&quot;What is a DTO and why use one?&quot;</li>
                <li>&quot;How does class-validator work in NestJS?&quot;</li>
                <li>&quot;What&apos;s the difference between class-validator and class-transformer?&quot;</li>
                <li>&quot;How do you enforce contracts between frontend and backend?&quot;</li>
                <li>&quot;How does Swagger help with API documentation?&quot;</li>
                <li>&quot;What are the security benefits of input validation?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>DTO (Data Transfer Object):</strong> A design pattern used to transfer data between layers or across network boundaries. In NestJS, DTOs define the shape and validation rules for request/response data. Benefits: type safety, validation, documentation, clear contracts.
                </li>
                <li>
                  <strong>class-validator:</strong> Decorator-based validation library for TypeScript. Decorators like @IsString(), @IsEmail(), @Min(), @Max() define validation rules. Works with NestJS ValidationPipe to automatically validate incoming requests. Throws 400 Bad Request if validation fails.
                </li>
                <li>
                  <strong>class-transformer:</strong> Library for transforming plain objects to class instances and vice versa. @Type() decorator ensures proper type conversion (e.g., query params from strings to numbers). Works with ValidationPipe transform: true to automatically transform payloads.
                </li>
                <li>
                  <strong>Strong Typing + Swagger:</strong> @ApiProperty() decorators from @nestjs/swagger add metadata for API documentation. DTOs serve dual purpose: runtime validation and API documentation. Swagger UI automatically generates interactive API docs from DTOs. Shared types ensure FE/BE contracts stay in sync.
                </li>
                <li>
                  <strong>Enforcing Contracts at the Boundary:</strong> ValidationPipe with whitelist: true strips unknown properties. forbidNonWhitelisted: true rejects requests with extra fields. transform: true converts payloads to DTO instances. This prevents injection attacks and ensures data integrity at the API boundary.
                </li>
                <li>
                  <strong>Shared Contract (FE/BE):</strong> DTOs define a shared contract between frontend and backend. Frontend can import shared types or generate types from Swagger/OpenAPI spec. Ensures type safety on both sides. API documentation becomes the source of truth. Changes to DTOs break compilation if contracts don&apos;t match.
                </li>
                <li>
                  <strong>Security Benefits:</strong> Input validation prevents malicious data from entering the system. Whitelisting prevents property pollution attacks. Type coercion prevents type confusion vulnerabilities. Email validation prevents injection. Min/Max validation prevents resource exhaustion. Always validate at the boundary, never trust client input.
                </li>
                <li>
                  <strong>API Documentation Benefits:</strong> Swagger/OpenAPI generates interactive API documentation automatically. Developers can test APIs directly from documentation. Frontend teams can see exact request/response schemas. Versioning and changes are clearly documented. Reduces need for separate API documentation. Integration with code generation tools.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">ValidationPipe Configuration:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Option</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Description</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Security Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">whitelist: true</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Strips properties that don&apos;t have decorators</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Prevents property pollution attacks</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">forbidNonWhitelisted: true</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Throws error if non-whitelisted properties are present</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Strict validation, rejects unknown fields</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">transform: true</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Automatically transforms payloads to DTO instances</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Ensures type safety, applies transformations</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">enableImplicitConversion: true</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Enables implicit type conversion</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Converts strings to numbers, etc.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


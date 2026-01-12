"use client";

import { useState } from "react";

/**
 * CLASS-VALIDATOR EXAMPLE
 *
 * Demonstrates class-validator decorators:
 * - Common validation decorators
 * - Validation rules and constraints
 * - How validation works in NestJS
 */

export default function ClassValidatorExample() {
  const [selectedValidator, setSelectedValidator] = useState<
    "basic" | "advanced" | "custom"
  >("basic");

  const validators = [
    { key: "basic", label: "Basic Validators" },
    { key: "advanced", label: "Advanced Validators" },
    { key: "custom", label: "Custom Validation" },
  ];

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        class-validator Decorators
      </h2>

      <div className="space-y-6">
        {/* Validator Selector */}
        <div className="flex flex-wrap gap-2">
          {validators.map((validator) => (
            <button
              key={validator.key}
              onClick={() => setSelectedValidator(validator.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedValidator === validator.key
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {validator.label}
            </button>
          ))}
        </div>

        {/* Basic Validators */}
        {selectedValidator === "basic" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">Basic Validation Decorators</h3>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
              <code>{`import {
  IsString,
  IsEmail,
  IsInt,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(18)
  @Max(120)
  age: number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  bio?: string;

  @IsBoolean()
  isActive: boolean;
}`}</code>
            </pre>
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-white border border-green-200 rounded">
                <p className="text-sm font-semibold text-gray-900 mb-2">Common Basic Validators:</p>
                <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                  <li><code className="bg-gray-100 px-1 rounded">@IsString()</code> - Must be a string</li>
                  <li><code className="bg-gray-100 px-1 rounded">@IsEmail()</code> - Must be a valid email</li>
                  <li><code className="bg-gray-100 px-1 rounded">@IsInt()</code> - Must be an integer</li>
                  <li><code className="bg-gray-100 px-1 rounded">@IsBoolean()</code> - Must be a boolean</li>
                  <li><code className="bg-gray-100 px-1 rounded">@IsOptional()</code> - Field is optional</li>
                  <li><code className="bg-gray-100 px-1 rounded">@IsNotEmpty()</code> - Cannot be empty</li>
                  <li><code className="bg-gray-100 px-1 rounded">@MinLength(n)</code> - Minimum string length</li>
                  <li><code className="bg-gray-100 px-1 rounded">@MaxLength(n)</code> - Maximum string length</li>
                  <li><code className="bg-gray-100 px-1 rounded">@Min(n)</code> - Minimum numeric value</li>
                  <li><code className="bg-gray-100 px-1 rounded">@Max(n)</code> - Maximum numeric value</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Validators */}
        {selectedValidator === "advanced" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">Advanced Validation Decorators</h3>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
              <code>{`import {
  IsEnum,
  IsArray,
  IsUUID,
  IsDateString,
  IsUrl,
  Matches,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';

enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  @Matches(/^[0-9]{5}$/)
  zipCode: string;
}

export class CreateUserDto {
  @IsEnum(UserRole)
  role: UserRole;

  @IsUUID('4')
  organizationId: string;

  @IsDateString()
  birthDate: string;

  @IsUrl()
  website?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  tags: string[];

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}`}</code>
            </pre>
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-white border border-green-200 rounded">
                <p className="text-sm font-semibold text-gray-900 mb-2">Advanced Validators:</p>
                <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                  <li><code className="bg-gray-100 px-1 rounded">@IsEnum()</code> - Must be one of the enum values</li>
                  <li><code className="bg-gray-100 px-1 rounded">@IsArray()</code> - Must be an array</li>
                  <li><code className="bg-gray-100 px-1 rounded">@IsUUID()</code> - Must be a valid UUID</li>
                  <li><code className="bg-gray-100 px-1 rounded">@IsDateString()</code> - Must be a valid date string</li>
                  <li><code className="bg-gray-100 px-1 rounded">@IsUrl()</code> - Must be a valid URL</li>
                  <li><code className="bg-gray-100 px-1 rounded">@Matches(regex)</code> - Must match regex pattern</li>
                  <li><code className="bg-gray-100 px-1 rounded">@ValidateNested()</code> - Validates nested objects</li>
                  <li><code className="bg-gray-100 px-1 rounded">@ArrayMinSize(n)</code> - Minimum array length</li>
                  <li><code className="bg-gray-100 px-1 rounded">@ArrayMaxSize(n)</code> - Maximum array length</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Custom Validation */}
        {selectedValidator === "custom" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">Custom Validation</h3>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
              <code>{`import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Custom validator constraint
@ValidatorConstraint({ async: false })
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    // Must have at least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/;
    return regex.test(password);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must be at least 8 characters with uppercase, lowercase, and number';
  }
}

// Custom decorator
export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStrongPasswordConstraint,
    });
  };
}

// Usage
export class CreateUserDto {
  @IsString()
  @IsStrongPassword()
  password: string;
}`}</code>
            </pre>
            <div className="mt-4 p-3 bg-white border border-green-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Custom Validators:</strong> Create reusable validation logic specific to
                your domain. Use <code className="bg-gray-100 px-1 rounded">@ValidatorConstraint</code> for
                complex validation rules that aren&apos;t covered by built-in validators.
              </p>
            </div>
          </div>
        )}

        {/* How Validation Works */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-blue-900">How Validation Works in NestJS:</h4>
          <ol className="text-sm text-gray-900 space-y-2 list-decimal list-inside">
            <li>Request arrives at controller endpoint</li>
            <li>ValidationPipe (configured globally) intercepts the request</li>
            <li>class-validator validates the DTO instance</li>
            <li>If validation fails → 400 Bad Request with error messages</li>
            <li>If validation passes → Request continues to handler</li>
          </ol>
          <pre className="mt-3 text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
            <code>{`// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);

// Controller
@Post('users')
create(@Body() dto: CreateUserDto) {
  // dto is already validated here!
  return this.service.create(dto);
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}


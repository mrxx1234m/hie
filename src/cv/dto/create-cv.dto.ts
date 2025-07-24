import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

// --- Skill DTO ---
export class CreateSkillDto {
  @ApiProperty({ example: "JavaScript", description: "Skill nomi" })
  @IsString()
  name: string;
}

// --- Experience DTO ---
export class CreateExperienceDto {
  @ApiProperty({ example: "Google", description: "Company nomi" })
  @IsString()
  companyName: string;

  @ApiProperty({ example: "Backend Developer", description: "Pozitsiya" })
  @IsString()
  position: string;

  @ApiProperty({ example: "2022-01-01", description: "Boshlanish sanasi" })
  @IsDateString()
  startWork: Date;

  @ApiProperty({ example: "2023-01-01", description: "Tugash sanasi" })
  @IsDateString()
  endWork: Date;

  @ApiProperty({ example: "Worked on API development", description: "Tavsif" })
  @IsString()
  description: string;
}

// --- Education DTO ---
export class CreateEducationDto {
  @ApiProperty({ example: "TUIT", description: "O'qish joyi" })
  @IsString()
  educationName: string;

  @ApiProperty({ example: "Bachelor", description: "Daraja" })
  @IsString()
  level: string;

  @ApiProperty({ example: "Computer Science", description: "Mutaxassislik" })
  @IsString()
  specialty: string;

  @ApiProperty({ example: "2018-09-01", description: "Boshlanish sanasi" })
  @IsDateString()
  startEducation: Date;

  @ApiProperty({ example: "2022-06-30", description: "Tugash sanasi" })
  @IsDateString()
  endEducation: Date;
}

// --- Language DTO ---
export class CreateLanguageDto {
  @ApiProperty({ example: "English", description: "Til nomi" })
  @IsString()
  lang: string;

  @ApiProperty({ example: "Fluent", description: "Darajasi" })
  @IsString()
  level: string;
}

// --- Main CV DTO ---
export class CreateCvDto {
  @ApiProperty({ example: "Ali Valiyev", description: "To‘liq ism" })
  @IsString()
  fullName: string;

  @ApiProperty({ example: "ali@gmail.com", description: "Email manzil" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqam" })
  @IsString()
  phone: string;

  @ApiProperty({ example: "1995-01-01", description: "Tug‘ilgan sana" })
  @IsDateString()
  birthday: Date;

  @ApiProperty({ example: "Tashkent", description: "Manzil" })
  @IsString()
  locatioin: string; // Agar bu xato bo'lsa, `location` deb o'zgartiring

  @ApiProperty({ example: "Experienced backend developer", description: "Tavsif" })
  @IsString()
  descriptioin: string; // Agar bu xato bo'lsa, `description` deb o'zgartiring

  @ApiProperty({ example: 1, description: "User ID" })
  userId: number;

  @ApiProperty({ type: [CreateExperienceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExperienceDto)
  experience: CreateExperienceDto[];

  @ApiProperty({ type: [CreateEducationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEducationDto)
  education: CreateEducationDto[];

  @ApiProperty({ type: [CreateLanguageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLanguageDto)
  languages: CreateLanguageDto[];

  @ApiProperty({ type: [CreateSkillDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDto)
  skills: CreateSkillDto[];
}

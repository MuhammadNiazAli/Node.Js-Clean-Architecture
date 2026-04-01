import { Request, Response } from 'express';

import { validateSignup } from '../validators/signup.validator';
import { validateLogin } from '../validators/login.validator';

import { MongoUserRepository } from '../../infrastructure/repositories/MongoUserRepository';
import { BcryptPasswordService } from '../../infrastructure/services/BcryptPasswordService';
import { JwtTokenService } from '../../infrastructure/services/JwtTokenService';

import { SignUpUserUseCase } from '../../application/use-cases/SignUpUser.usecase';
import { LoginUserUseCase } from '../../application/use-cases/LoginUser.usecase';

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    validateSignup(username, email, password);

    const userRepository = new MongoUserRepository();
    const passwordService = new BcryptPasswordService();

    const useCase = new SignUpUserUseCase(
      userRepository,
      passwordService
    );

    const user = await useCase.execute({
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    validateLogin(email, password);

    const userRepository = new MongoUserRepository();
    const passwordService = new BcryptPasswordService();
    const tokenService = new JwtTokenService();

    const useCase = new LoginUserUseCase(
      userRepository,
      passwordService,
      tokenService
    );

    const result = await useCase.execute({
      email,
      password,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
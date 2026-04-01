import { Response } from 'express';

import { AuthenticatedRequest } from '../../shared/types/ExpressRequest';
import { MongoUserRepository } from '../../infrastructure/repositories/MongoUserRepository';
import { GetProfileUseCase } from '../../application/use-cases/GetProfile.usecase';

export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userRepository = new MongoUserRepository();

    const useCase = new GetProfileUseCase(userRepository);

    const profile = await useCase.execute(req.user!.userId);

    return res.status(200).json(profile);
  } catch (error: any) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
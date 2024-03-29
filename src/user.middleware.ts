import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { User } from './shemas/userlog.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private USER: Model<User>) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const email = req.headers['user-email'];
    const id = req.headers['user-id'];
    try {
      const userFound = await this.USER.findOne({ email: email });

      if (userFound?.attempts >= 10) {
        res.status(430).send({
          limit: true,
          message:
            'Sorry due to trial version of the AI models I have limited queries to 10 per email ID. User has reached the limit , please use another email ID.',
        });

        if (!userFound) {
          const newUser = new this.USER({
            email: email,
            clerkid: id,
            attempts: 1,
          });
          await newUser.save();
        } else {
          await this.USER.findOneAndUpdate(
            { email: email },
            { $inc: { attempts: 1 } }, // Increment the "attempts" field by 1
          );
        }
      }

      next();
    } catch (error) {
      console.log(error);
    }
  }
}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.SECRET_ENV}`,
    }),
  ],
  providers: [],
})
export class AppModule {}

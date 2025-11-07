import {
  UsersModule,
} from '@/src/modules';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.SECRET_ENV}`,
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(TenantMiddleware).forRoutes('*');
//   }
// }
export class AppModule {}

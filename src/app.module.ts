import {
  AuthModule,
  BranchServicesModule,
  BranchesModule,
  ModulesModule,
  PagesModule,
  PermissionModulesModule,
  PermissionPagesModule,
  PermissionsModule,
  ServicesModule,
  TenantStatusModule,
  TenantsModule,
  UserStatusModule,
  UsersModule,
} from '@/src/modules';
import { Module, forwardRef } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, PrismaModule } from './infra';
import { AccessGuard } from './infra/guards/access.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.SECRET_ENV}`,
    }),
    forwardRef(() => AuthModule),
    BranchServicesModule,
    BranchesModule,
    ModulesModule,
    PagesModule,
    PermissionModulesModule,
    PermissionPagesModule,
    PermissionsModule,
    PrismaModule,
    ServicesModule,
    TenantStatusModule,
    TenantsModule,
    UserStatusModule,
    forwardRef(() => UsersModule),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(TenantMiddleware).forRoutes('*');
//   }
// }
export class AppModule {}

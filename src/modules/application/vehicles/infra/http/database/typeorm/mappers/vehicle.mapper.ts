import { CustomerTypeEnum } from '@/src/core';
import type { VehiclesEntity } from '@/src/infra';
import type {
  CreateVehicleRequestDto,
  ReadVehicleResponseDto,
  UpdateVehicleRequestDto,
} from '@/src/modules/application/vehicles/dtos';

export class VehicleMapper {
  static toDatabase(data: CreateVehicleRequestDto | UpdateVehicleRequestDto) {}

  static toDomain(raw: VehiclesEntity): ReadVehicleResponseDto {
    return {
      id: raw.id,
      licensePlate: raw.licensePlate,
      brand: raw.brand,
      color: raw.color,
      currentMileage: raw.currentMileage,
      model: raw.model,
      year: raw.year,
      customer: {
        id: raw.customers.id,
        document: raw.customers.document,
        email: raw.customers.email,
        name: raw.customers.name,
        phone: raw.customers.phone,
        isWhatsapp: raw.customers.isWhatsapp,
        backupPhone: raw.customers.backupPhone ?? undefined,
        ownerBackupPhone: raw.customers.ownerBackupPhone ?? undefined,
        customerType: CustomerTypeEnum[raw.customers.customerType],
        createdAt: raw.customers.createdAt.toISOString(),
        updatedAt: raw.customers.updatedAt
          ? raw.customers.updatedAt.toISOString()
          : null,
      },
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}

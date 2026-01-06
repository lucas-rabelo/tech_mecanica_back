declare namespace Express {
  export interface Request {
    token: string | null;
    user: {
      id: number;
      name: string;
      email: string;
      birthDate: Date;
      phone: string;
      document: string;
      userStatus: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string | null;
      };
      createdAt: string;
      updatedAt: string | null;
    };
    tenantId?: number | null;
    tenant: {
      id: number;
      name: string;
      tenantStatus: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date | null;
      };
      subdomain: string;
      createdAt: Date;
      updatedAt: Date | null;
    } | null;
  }
}

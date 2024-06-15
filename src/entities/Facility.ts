import prisma from "@/prisma";
import Serializable from "./Serializable";

export default class Facility extends Serializable {
    private facility_id: number;
    private logo: string;
    private type: string;
    private location: string;
    private description: string;

    constructor(facility_id: number, logo: string, type: string, location: string, description: string) {
        super();
        this.facility_id = facility_id;
        this.logo = logo;
        this.type = type;
        this.location = location;
        this.description = description;
    }

    // Getters
    getId(): number {
        return this.facility_id;
    }
    getLogo(): string {
        return this.logo;
    }
    getType(): string {
        return this.type;
    }
    getLocation(): string {
        return this.location;
    }
    getDescription(): string {
        return this.description;
    }

    // Methods
    serialize(): string {
        return JSON.stringify({
            facility_id: this.facility_id,
            logo: this.logo,
            type: this.type,
            location: this.location,
            description: this.description,
        });
    }

    // Static methods
    static deserialize(data: string): Facility {
        const {facility_id, logo, type, location, description} = JSON.parse(data);
        return new Facility(facility_id, logo, type, location, description);
    }

    static async getByID(facility_id: number): Promise<Facility | null> {
        const facility = await prisma.facility.findUnique({
            where: {
                facility_id: facility_id,
            },
        });

        if (!facility) {
            return null;
        }

        return new Facility(facility.facility_id, facility.logo, facility.type, facility.location, facility.description);
    }

   static async getAll(): Promise<Facility[]> {
        const facilities = await prisma.facility.findMany();
        return facilities.map(facility => new Facility(facility.facility_id, facility.logo, facility.type, facility.location, facility.description));
    }
   }
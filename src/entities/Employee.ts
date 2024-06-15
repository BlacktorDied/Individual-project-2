import prisma from "@/prisma";
import Serializable from "./Serializable";

export default class Employee extends Serializable {
    private Emp_id: number;
    private name: string;
    private position: string;
    private facility_id: number;

    constructor(Emp_id: number, name: string, position: string, facility_id: number) {
        super();
        this.Emp_id = Emp_id;
        this.name = name;
        this.position = position;
        this.facility_id = facility_id;
    }

    // Getters
    getId(): number {
        return this.Emp_id;
    }
    getName(): string {
        return this.name;
    }
    getPosition(): string {
        return this.position;
    }
    getFacilityId(): number {
        return this.facility_id;
    }

    // Methods
    serialize(): string {
        return JSON.stringify({
            Emp_id: this.Emp_id,
            name: this.name,
            position: this.position,
            facility_id: this.facility_id,
        });
    }

    // Static methods
    static deserialize(data: string): Employee {
        const { Emp_id, name, position, facility_id } = JSON.parse(data);
        return new Employee(Emp_id, name, position, facility_id);
    }

    static async getAll(): Promise<Employee[]> {
        const employees = await prisma.employee.findMany();
        return employees.map((employee) => new Employee(employee.employee_id, employee.name, employee.position, employee.facility_id));
    }
}
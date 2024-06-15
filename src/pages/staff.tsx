import styles from '@/styles/Staff.module.scss';
import {GetServerSideProps} from "next";
import Link from 'next/link';

import Employee from "@/entities/Employee";

type Props = {
    staff: string[];
}

export const getServerSideProps:GetServerSideProps<Props> = async () => {
    const staff = await Employee.getAll();

    return {
        props: {
            staff: staff.map((employee) => employee.serialize())
        }
    };
}

export default function SCPs({staff}:Props) {
    const list = staff.map(Employee.deserialize)

    return(
        <section className="container">
            <div className={styles.main}>
                <h1 className={styles.main__title}>List of all Employees</h1>

                <div className={styles.main__cards}>
                    {list.map((scp ) => (
                        <Link key={scp.getId()} className={styles.card} href={"/"}>
                            <h2 className={styles.card__id}>SCP-{scp.getId()}</h2>
                            <p className={styles.card__name}>{scp.getName()}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
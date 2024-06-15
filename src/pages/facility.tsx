import styles from "@/styles/Facility.module.scss";
import {GetServerSideProps} from "next";
import Link from 'next/link';

import Facility from "@/entities/Facility";

type Props = {
    facilities: string[];
}

export const getServerSideProps:GetServerSideProps<Props> = async () => {
    const facilities = await Facility.getAll();

    return {
        props: {
            facilities: facilities.map((facility) => facility.serialize())
        }
    };
}

export default function Facilities({facilities}:Props) {
    const list = facilities.map(Facility.deserialize)

    return(
        <section className="container">
            <div className={styles.main}>
                <h1 className={styles.main__title}>List of all Facilities</h1>

                <div className={styles.main__cards}>
                    {list.map((facility) => (
                        <div key={facility.getId()} className={styles.card}>
                            <div className={styles.card__block}>
                                <img className={styles.card__blockImage} src={facility.getLogo()} alt={facility.getType()}/>
                                <h2 className={styles.card__blockId}>SITE-{facility.getId().toString().padStart(2, '0')}</h2>
                            </div>
                            <div className={styles.card__sidebar}>
                                <img className={styles.card__sidebarImage} src={facility.getLogo()} alt={facility.getType()}/>
                                <div className={styles.card__sidebarTexts}>
                                    <h2 className={styles.card__sidebarId}>{facility.getType()} SITE-{facility.getId().toString().padStart(2, '0')}</h2>
                                    <p className={styles.card__sidebarLocation}><strong>Location: </strong>{facility.getLocation()}</p>
                                    <p className={styles.card__sidebarDescription}><strong>Description: </strong>{facility.getDescription()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Link href={"/add"} className={styles.card__add}>
                        <img src={"/icons/plus.svg"} alt="Add Facility"/>
                    </Link>
                </div>
            </div>
        </section>
    )
        ;
}
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
    const facility_1 = await prisma.facility.upsert({
        where: { facility_id: 1},
        update: {},
        create: {
            facility_id: 1,
            logo: 'https://scp-wiki.wdfiles.com/local--files/secure-facilities-locations/Site-01.svg',
            type: 'Protected',
            location: '[DATA EXPUNGED]',
            description: 'Site-01, also known as Overwatch HQ, is a safe zone that acts as a data backup for all major Foundation facilities worldwide, as well as a secure meeting facility for O5 Council members and other high-ranking Foundation personnel. All further details, including the location of Site-01, are strictly classified.',
        }
    })

    const facility_12 = await prisma.facility.upsert({
        where: { facility_id: 12},
        update: {},
        create: {
            facility_id: 12,
            logo: 'https://scp-wiki.wdfiles.com/local--files/secure-facilities-locations/Site-12.svg',
            type: 'Research and Containment',
            location: 'Devon, England, UK',
            description: 'Site-12 is situated underneath the Avon Dam, within the Dartmoor National Park. One of the first sites to be commissioned after the Foundation formation, Site-12 focuses primarily on research and administration, and is one of the most important sites in the British Isles. The site more prominent feature is its library, which hold the largest collection of anomalous history and documentation within the Foundation. As a result, numerous research departments have taken residence there, including the Department of History, who use the site as their headquarters.',
        }
    })

    const facility_98 = await prisma.facility.upsert({
        where: { facility_id: 98},
        update: {},
        create: {
            facility_id: 98,
            logo: 'https://scp-wiki.wdfiles.com/local--files/secure-facilities-locations/Site-98.svg',
            type: 'Dimensional Research',
            location: 'Philadelphia, Pennsylvania, USA',
            description: 'Site-98 develops and innovates the bleeding-edge technologies that enable the Foundation to contain, analyze, and research various anomalous threats endangering the world, all behind the front of NASA research. Site-98 is often considered to be the Foundation\'s most technologically-advanced research facility.',
        }
    })

    const scp_049 = await prisma.sCP.upsert({
        where: { scp_id: 49},
        update: {},
        create: {
            scp_id: 49,
            name: 'Plague Doctor',
            photo: 'https://scp-wiki.wdfiles.com/local--files/scp-049/SCP-049-Image-2.png',
            objectClass: 'Euclid',
            containment: "SCP-049 is contained within a Standard Secure Humanoid Containment Cell in Research Sector-02 at Site-19. SCP-049 must be sedated before any attempts to transport it. During transport, SCP-049 must be secured within a Class III Humanoid Restriction Harness (including a locking collar and extension restraints) and monitored by no fewer than two armed guards.",
            description: "SCP-049 is a humanoid entity, roughly 1.9 meters in height, which bears the appearance of a medieval plague doctor. While SCP-049 appears to be wearing the thick robes and the ceramic mask indicative of that profession, the garments instead seem to have grown out of SCP-049's body over time1, and are now nearly indistinguishable from whatever form is beneath them. X-rays indicate that despite this, SCP-049 does have a humanoid skeletal structure beneath its outer layer.",
            facility_id: 1,
        }
    })
    const scp_682 = await prisma.sCP.upsert({
        where: { scp_id: 682},
        update: {},
        create: {
            scp_id: 682,
            name: 'Hard-to-Destroy Reptile',
            photo: 'https://scp-wiki.wdfiles.com/local--files/scp-682/monster8editub9-new.jpg',
            objectClass: 'Keter',
            containment: "SCP-682 must be destroyed as soon as possible. At this time, no means available to SCP teams are capable of destroying SCP-682, only able to cause massive physical damage. SCP-682 should be contained within a 5 m x 5 m x 5 m chamber with 25 cm reinforced acid-resistant steel plate lining all inside surfaces. The containment chamber should be filled with hydrochloric acid until SCP-682 is submerged and incapacitated. Any attempts of SCP-682 to move, speak, or breach containment should be reacted to quickly and with full force as called for by the circumstances.",
            description: 'SCP-682 is a large, vaguely reptile-like creature of unknown origin. It appears to be extremely intelligent, and was observed to engage in complex communication with SCP-079 during their limited time of exposure. SCP-682 appears to have a hatred of all life, which has been expressed in several interviews during containment. (See Addendum 682-B).',
            facility_id: 1,
        }
    })
    const scp_087 = await prisma.sCP.upsert({
        where: { scp_id: 87},
        update: {},
        create: {
            scp_id: 87,
            name: 'The Stairwell',
            photo: 'https://scp-wiki.wdfiles.com/local--files/scp-087/087stairface.png',
            objectClass: 'Euclid',
            containment: 'SCP-087 is located on the campus of [REDACTED]. The doorway leading to SCP-087 is constructed of reinforced steel with an electro-release lock mechanism. It has been disguised to resemble a janitorial closet consistent with the design of the building. The lock mechanism on the doorknob will not release unless ██ volts are applied in conjunction with counter-clockwise rotation of the key. The inside of the door is lined with 6 centimeters of industrial foam padding.',
            description: 'SCP-087 is an unlit platform staircase. Stairs descend on a 38 degree angle for 13 steps before reaching a semicircular platform of approximately 3 meters in diameter. Descent direction rotates 180 degrees at each platform. The design of SCP-087 limits subjects to a visual range of approximately 1.5 flights. A light source is required for any subjects exploring SCP-087, as there are no lighting fixtures or windows present. Lighting sources brighter than 75 watts have shown to be ineffective, as SCP-087 seems to absorb excess light.',
            facility_id: 1,
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
import styles from "@/styles/Home.module.scss";

export default function Home() {
  return (
    <div className="container">
      <div className={styles.main}>
        <h1 className={styles.main__title}>Welcome to the SCP Foundation</h1>
        <p className={styles.main__text1}>
          The SCP Foundation is a fictional organization documented by the
          web-based collaborative-fiction project of the same name. In universe,
          the SCP Foundation is responsible for locating and containing
          individuals, entities, locations, and objects that violate natural law
          (referred to as SCPs). The real-world website is community based and
          includes elements of many genres such as horror, science fiction and
          urban fantasy.
        </p>
        <p className={styles.main__text2}>
          On this website you can find information about the SCPs, the staff and
          the facilities of the SCP Foundation. Authorized users can
          create, update and delete SCPs, staff and facilities.
        </p>
      </div>
    </div>
  );
}

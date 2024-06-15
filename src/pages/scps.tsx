import styles from "@/styles/SCPs.module.scss";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Link from "next/link";

import Edit from "@/icons/pencil.svg";
import Bin from "@/icons/bin.svg";
import Plus from "@/icons/plus.svg";
import Close from "@/icons/close.svg";

import SCP from "@/entities/SCP";
import Facility from "@/entities/Facility";

//Get all SCPs
type Props = {
  scps: string[];
  facilities: number[];
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const scps = await SCP.getAll();
  const facilities = await Facility.getAll();

  return {
    props: {
      scps: scps.map((scp) => scp.serialize()),
      facilities: facilities.map((facility) => facility.getId()),
    },
  };
};

export default function SCPs({ scps, facilities }: Props) {
  const [addHidden, setAddHidden] = useState<boolean>(true);
  const [updateHidden, setUpdateHidden] = useState<number>();

  const list = scps.map(SCP.deserialize);

  // Add new SCP
  async function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/scp", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      location.reload();
    }
  }

  // Update SCP
  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/scp", {
      method: "PATCH",
      body: formData,
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      location.reload();
    }
  }

  // Delete SCP
  async function handleDelete(scp_id: number) {
    const formData = new FormData();
    formData.append("scp_id", scp_id.toString());

    const response = await fetch("/api/scp", {
      method: "DELETE",
      body: formData,
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      location.reload();
    }
  }

  // Page
  return (
    <section className="container">
      <div className={styles.main}>
        <h1 className={styles.main__title}>List of all SCPs</h1>
        <div className={styles.main__show}>
        </div>
        <div className={styles.main__cards}>
          {list.map((scp) => (
            <div key={scp.getId()}>
              {updateHidden == scp.getId() ? (
                <div className={styles.form__wrapper}>
                  <Close
                    className={styles.form__close}
                    onClick={() => setUpdateHidden(undefined)}
                  />
                  <form className={styles.form} onSubmit={handleUpdate}>
                    <label htmlFor="scp_id">
                      <strong>Item#: </strong>
                      <input
                        type="text"
                        name="scp_id"
                        id="scp_id"
                        value={`SCP-${scp.formatedId()}`}
                        placeholder="SCP-049"
                      />
                    </label>

                    <label htmlFor="name">
                      <strong>Name: </strong>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={scp.getName()}
                        placeholder="Plague Doctor"
                      />
                    </label>

                    <label htmlFor="object_class">
                      <strong>Class: </strong>
                      <select name="object_class" id="object_class" defaultValue={scp.getObjectClass()}>
                        <option value=""></option>
                        <option value="Safe">Safe</option>
                        <option value="Euclid">Euclid</option>
                        <option value="Keter">Keter</option>
                      </select>
                    </label>

                    <label htmlFor="description">
                      <strong>Description: </strong>
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      value={scp.getDescription()}
                    />

                    <label htmlFor="containment">
                      <strong>Containment Procedures: </strong>
                    </label>
                    <textarea
                      name="containment"
                      id="containment"
                      value={scp.getContainment()}
                    />

                    <label htmlFor="photo">
                      <strong>SCP Photo (URL): </strong>
                    </label>
                    <input
                      type="text"
                      name="photo"
                      id="photo"
                      value={scp.getPhoto()}
                      placeholder="https://scp-wiki.wdfiles.com/local--files/scp-049/SCP-049-Image-2.png"
                    />

                    <label htmlFor="facility_id">
                      <strong>Facility ID: </strong>
                      <select name="facility_id" id="facility_id">
                        {facilities.map((facility) => (
                          <option key={facility} value={facility} defaultValue={scp.getFacilityId()}>
                            Site-{facility.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </label>

                    <button type="submit">Update</button>
                  </form>
                </div>
              ) : (
                <div className={styles.card}>
                  <div className={styles.card__top}>
                    <Edit
                      className={styles.card__topEdit}
                      onClick={() => setUpdateHidden(scp.getId())}
                    />
                    <Bin
                      className={styles.card__topDelete}
                      onClick={() => handleDelete(scp.getId())}
                    />
                  </div>
                  <Link
                    className={styles.card__bottom}
                    href={`/scp-${scp.formatedId()}`}
                  >
                    <div className={styles.card__bottomTexts}>
                      <h2 className={styles.card__bottomId}>
                        <strong>Item#: </strong>SCP-
                        {scp.formatedId()}
                      </h2>
                      <p className={styles.card__bottomName}>
                        <strong>Name: </strong>
                        {scp.getName()}
                      </p>
                      <p className={styles.card__bottomClass}>
                        <strong>Class: </strong>
                        {scp.getObjectClass()}
                      </p>
                      <p className={styles.card__bottomDescription}>
                        <strong>Description: </strong>
                        {scp.getDescription()}
                      </p>
                    </div>
                    <img
                      className={styles.card__bottomImage}
                      src={scp.getPhoto()}
                      alt={scp.getName()}
                    />
                  </Link>
                </div>
              )}
            </div>
          ))}
          <div className={styles.card__add}>
            {addHidden ? (
              <Plus
                className={styles.card__addImage}
                onClick={() => setAddHidden(false)}
              />
            ) : (
              <div className={styles.form__wrapper}>
                <Close
                  className={styles.form__close}
                  onClick={() => setAddHidden(true)}
                />
                <form className={styles.form} onSubmit={handleAdd}>
                  <label htmlFor="scp_id">
                    <strong>Item#: </strong>
                    <input
                      type="text"
                      name="scp_id"
                      id="scp_id"
                      placeholder="SCP-049"
                    />
                  </label>

                  <label htmlFor="name">
                    <strong>Name: </strong>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Plague Doctor"
                    />
                  </label>

                  <label htmlFor="object_class">
                    <strong>Class: </strong>
                    <select name="object_class" id="object_class">
                      <option value=""></option>
                      <option value="Safe">Safe</option>
                      <option value="Euclid">Euclid</option>
                      <option value="Keter">Keter</option>
                    </select>
                  </label>

                  <label htmlFor="description">
                    <strong>Description: </strong>
                  </label>
                  <textarea name="description" id="description" />

                  <label htmlFor="containment">
                    <strong>Containment Procedures: </strong>
                  </label>
                  <textarea name="containment" id="containment"/>

                  <label htmlFor="photo">
                    <strong>SCP Photo (URL): </strong>
                  </label>
                  <input
                    type="text"
                    name="photo"
                    id="photo"
                    defaultValue="/img/no-image.png"
                    placeholder="https://scp-wiki.wdfiles.com/local--files/scp-049/SCP-049-Image-2.png"
                  />

                  <label htmlFor="facility_id">
                    <strong>Facility ID: </strong>
                    <select name="facility_id" id="facility_id">
                      {facilities.map((facility_id) => (
                        <option key={facility_id} value={facility_id}>
                          Site-{facility_id.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button type="submit">Add SCP</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

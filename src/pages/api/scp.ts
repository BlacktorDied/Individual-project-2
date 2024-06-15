import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

import SCP from "@/entities/SCP";
import Facility from "@/entities/Facility";

type Data = {
  error?: string;
  success?: boolean;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const form = formidable();
  form.parse(req, async (err, fields) => {
    // Handle POST request
    if (req.method == "POST") {
      const scp_id = parseInt(fields.scp_id?.[0].split("-")[1] ?? "");
      const name = fields.name?.[0];
      const photo = fields.photo?.[0];
      const object_class = fields.object_class?.[0];
      const containment = fields.containment?.[0];
      const description = fields.description?.[0];
      const facility_id = parseInt(fields.facility_id?.[0] ?? "");

      if (isNaN(scp_id)) {
        return res.json({ error: "Invalid SCP ID" });
      }
      if (!name) {
        return res.json({ error: "Invalid SCP Name" });
      }
      if (!photo) {
        return res.json({ error: "Invalid SCP Photo" });
      }
      if (!object_class) {
        return res.json({ error: "Invalid SCP Object Class" });
      }
      if (!containment) {
        return res.json({ error: "Invalid SCP Containment Procedures" });
      }
      if (!description) {
        return res.json({ error: "Invalid SCP Description" });
      }
      if (isNaN(facility_id) && !Facility.getByID(facility_id)) {
        return res.json({ error: "Invalid Facility ID" });
      }

      await SCP.create(
        scp_id,
        name,
        photo,
        object_class,
        containment,
        description,
        facility_id
      );
      res.status(200).json({ success: true });
    }

    // Handle DELETE request
    if (req.method == "DELETE") {
      const scp_id = parseInt(fields.scp_id?.[0] ?? "");
      console.log(fields);

      if (isNaN(scp_id)) {
        return res.json({ error: "Invalid SCP ID" });
      }

      await SCP.delete(scp_id);
      res.status(200).json({ success: true });
    }
  });
}

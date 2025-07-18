import { useEffect, useState } from "react";

const StaffPermissions = ({ staffId, onAssign, defaultPermissions = {} }) => {
 
  const [permissions, setPermissions] = useState(() => ({
    create: defaultPermissions.create || false,
    view: defaultPermissions.view || false,
    edit: defaultPermissions.edit || false,
    delete: defaultPermissions.del || false, 
  }));

  

  const toggle = (perm) => {
    const updated = { 
      ...permissions, 
      [perm]: !permissions[perm] 
    };
    setPermissions(updated);
    onAssign(staffId, {
      ...updated,
      del: updated.delete 
    });
  };

  return (
    <div className="flex flex-wrap gap-2 text-sm">
      {["create", "view", "edit", "delete"].map((perm) => (
        <label key={perm} className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={permissions[perm]}
            onChange={() => toggle(perm)}
          />
          {perm}
        </label>
      ))}
    </div>
  );
};

export default StaffPermissions;
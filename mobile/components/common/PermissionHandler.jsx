import React from "react";

const PermissionHandler = ({
  user,
  allowedPermissions,
  onlyForHomeOwner = false,
  children,
}) => {
  // If onlyForHomeOwner is true, check if the user is a homeowner
  if (onlyForHomeOwner) {
    return user.role_type === "home_owner" ? <>{children}</> : null;
  }

  // Check if the user is a homeowner
  if (user.role_type === "home_owner") {
    return <>{children}</>;
  }

  // Check if the user has any matching permissions
  const hasPermission = user.household_permissions?.some((permission) =>
    allowedPermissions.includes(permission.permission_type)
  );

  // Render children only if the user has the required permissions
  if (hasPermission) {
    return <>{children}</>;
  }

  // Render nothing if the user does not have permissions
  return null;
};

export default PermissionHandler;

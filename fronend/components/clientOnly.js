import React, { useEffect, useState } from "react";

/**
 * This component renders it's children only in the client side.
 * But I believe it's exactly the same I'm doing already with
 * nonSsrWrapper component. Then I'm not using this one
 */
export default function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}

import { Suspense } from "react";

import BulkDataTable from "@/components/ui/tables/BulkDataTable";
import BulkDataTableSkeleton from "@/components/ui/tables/BulkDataTableSkeleton";

export default async function Campaign() {
  const name = "campaign";
  const url = `/admin/catalog/${name}/bulk`;
  return (
    <Suspense fallback={<BulkDataTableSkeleton />}>
      <BulkDataTable name={name} url={url} />
    </Suspense>
  );
}
